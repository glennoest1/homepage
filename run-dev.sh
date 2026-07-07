#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT_DIR/.env"
LOG_DIR="$ROOT_DIR/.logs"

ENV_BACKEND_HOST="${BACKEND_HOST:-}"
ENV_BACKEND_PORT="${BACKEND_PORT:-}"
ENV_FRONTEND_HOST="${FRONTEND_HOST:-}"
ENV_FRONTEND_PORT="${FRONTEND_PORT:-}"
ENV_JAVA_HOME="${JAVA_HOME:-}"
ENV_MAVEN_CMD="${MAVEN_CMD:-}"
ENV_NPM_CMD="${NPM_CMD:-}"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

[[ -n "$ENV_BACKEND_HOST" ]] && BACKEND_HOST="$ENV_BACKEND_HOST"
[[ -n "$ENV_BACKEND_PORT" ]] && BACKEND_PORT="$ENV_BACKEND_PORT"
[[ -n "$ENV_FRONTEND_HOST" ]] && FRONTEND_HOST="$ENV_FRONTEND_HOST"
[[ -n "$ENV_FRONTEND_PORT" ]] && FRONTEND_PORT="$ENV_FRONTEND_PORT"
[[ -n "$ENV_JAVA_HOME" ]] && JAVA_HOME="$ENV_JAVA_HOME"
[[ -n "$ENV_MAVEN_CMD" ]] && MAVEN_CMD="$ENV_MAVEN_CMD"
[[ -n "$ENV_NPM_CMD" ]] && NPM_CMD="$ENV_NPM_CMD"

BACKEND_PORT="${BACKEND_PORT:-8080}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"
BACKEND_HOST="${BACKEND_HOST:-localhost}"
FRONTEND_HOST="${FRONTEND_HOST:-localhost}"
BACKEND_URL="http://$BACKEND_HOST:$BACKEND_PORT"
FRONTEND_URL="http://$FRONTEND_HOST:$FRONTEND_PORT"
MAVEN_CMD="${MAVEN_CMD:-mvn}"
NPM_CMD="${NPM_CMD:-npm}"

if [[ -n "${JAVA_HOME:-}" ]]; then
  export PATH="$JAVA_HOME/bin:$PATH"
fi

mkdir -p "$LOG_DIR"

BACKEND_LOG="$LOG_DIR/backend.dev.log"
FRONTEND_LOG="$LOG_DIR/frontend.dev.log"
METADATA_ENV="$LOG_DIR/dev-servers.env"
METADATA_JSON="$LOG_DIR/dev-servers.json"
: > "$BACKEND_LOG"
: > "$FRONTEND_LOG"

BACKEND_PID=""
FRONTEND_PID=""
BACKEND_TAIL_PID=""
FRONTEND_TAIL_PID=""

write_metadata() {
  local status="$1"
  local updated_at
  updated_at="$(date -Iseconds)"

  cat > "$METADATA_ENV" <<EOF
STATUS=$status
UPDATED_AT=$updated_at
BACKEND_PORT=$BACKEND_PORT
BACKEND_PID=${BACKEND_PID:-}
BACKEND_URL=$BACKEND_URL
BACKEND_API_URL=$BACKEND_URL/api/v1/navigation/active-links
BACKEND_LOG=$BACKEND_LOG
FRONTEND_PORT=$FRONTEND_PORT
FRONTEND_PID=${FRONTEND_PID:-}
FRONTEND_URL=$FRONTEND_URL
FRONTEND_LOG=$FRONTEND_LOG
EOF

  cat > "$METADATA_JSON" <<EOF
{
  "status": "$status",
  "updatedAt": "$updated_at",
  "backend": {
    "port": $BACKEND_PORT,
    "pid": ${BACKEND_PID:-null},
    "url": "$BACKEND_URL",
    "apiUrl": "$BACKEND_URL/api/v1/navigation/active-links",
    "log": "$BACKEND_LOG"
  },
  "frontend": {
    "port": $FRONTEND_PORT,
    "pid": ${FRONTEND_PID:-null},
    "url": "$FRONTEND_URL",
    "log": "$FRONTEND_LOG"
  }
}
EOF
}

stop_process() {
  local pid="${1:-}"
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null || true
  fi
}

cleanup() {
  echo
  echo "Stopping dev servers..."
  stop_process "$BACKEND_PID"
  stop_process "$FRONTEND_PID"
  stop_process "$BACKEND_TAIL_PID"
  stop_process "$FRONTEND_TAIL_PID"
  wait "$BACKEND_PID" "$FRONTEND_PID" "$BACKEND_TAIL_PID" "$FRONTEND_TAIL_PID" 2>/dev/null || true
  write_metadata "stopped"
}

trap cleanup EXIT INT TERM

prefix_log() {
  local name="$1"
  sed -u "s/^/[$name] /"
}

if [[ ! -d "$ROOT_DIR/frontend/node_modules" ]]; then
  echo "Installing frontend dependencies..."
  (cd "$ROOT_DIR/frontend" && "$NPM_CMD" install)
fi

export VITE_BACKEND_URL="$BACKEND_URL"

echo "Starting backend:  $BACKEND_URL"
(
  cd "$ROOT_DIR/backend"
  "$MAVEN_CMD" spring-boot:run -Dspring-boot.run.arguments="--server.port=$BACKEND_PORT" >> "$BACKEND_LOG" 2>&1
) &
BACKEND_PID=$!

echo "Starting frontend: $FRONTEND_URL"
(
  cd "$ROOT_DIR/frontend"
  "$NPM_CMD" run dev -- --host 0.0.0.0 --port "$FRONTEND_PORT" >> "$FRONTEND_LOG" 2>&1
) &
FRONTEND_PID=$!

tail -n +1 -F "$BACKEND_LOG" 2>/dev/null | prefix_log "backend" &
BACKEND_TAIL_PID=$!

tail -n +1 -F "$FRONTEND_LOG" 2>/dev/null | prefix_log "frontend" &
FRONTEND_TAIL_PID=$!

write_metadata "running"

cat <<EOF

Dev servers are starting.
Frontend: $FRONTEND_URL
Backend:  $BACKEND_URL
Metadata: $METADATA_ENV
Logs:     $BACKEND_LOG
          $FRONTEND_LOG

Press Ctrl+C to stop both.

EOF

wait "$BACKEND_PID" "$FRONTEND_PID"
