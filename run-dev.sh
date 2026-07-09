#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT_DIR/.env"
LOG_DIR="$ROOT_DIR/.logs"

ENV_FRONTEND_HOST="${FRONTEND_HOST:-}"
ENV_FRONTEND_PORT="${FRONTEND_PORT:-}"
ENV_NPM_CMD="${NPM_CMD:-}"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

[[ -n "$ENV_FRONTEND_HOST" ]] && FRONTEND_HOST="$ENV_FRONTEND_HOST"
[[ -n "$ENV_FRONTEND_PORT" ]] && FRONTEND_PORT="$ENV_FRONTEND_PORT"
[[ -n "$ENV_NPM_CMD" ]] && NPM_CMD="$ENV_NPM_CMD"

FRONTEND_PORT="${FRONTEND_PORT:-5173}"
FRONTEND_HOST="${FRONTEND_HOST:-localhost}"
FRONTEND_URL="http://$FRONTEND_HOST:$FRONTEND_PORT"
NPM_CMD="${NPM_CMD:-npm}"

mkdir -p "$LOG_DIR"

FRONTEND_LOG="$LOG_DIR/frontend.dev.log"
METADATA_ENV="$LOG_DIR/dev-servers.env"
METADATA_JSON="$LOG_DIR/dev-servers.json"
: > "$FRONTEND_LOG"

FRONTEND_PID=""
FRONTEND_TAIL_PID=""

write_metadata() {
  local status="$1"
  local updated_at
  updated_at="$(date -Iseconds)"

  cat > "$METADATA_ENV" <<EOF
STATUS=$status
UPDATED_AT=$updated_at
FRONTEND_PORT=$FRONTEND_PORT
FRONTEND_PID=${FRONTEND_PID:-}
FRONTEND_URL=$FRONTEND_URL
FRONTEND_LOG=$FRONTEND_LOG
EOF

  cat > "$METADATA_JSON" <<EOF
{
  "status": "$status",
  "updatedAt": "$updated_at",
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
  echo "Stopping dev server..."
  stop_process "$FRONTEND_PID"
  stop_process "$FRONTEND_TAIL_PID"
  wait "$FRONTEND_PID" "$FRONTEND_TAIL_PID" 2>/dev/null || true
  write_metadata "stopped"
}

trap cleanup EXIT INT TERM

prefix_log() {
  sed -u "s/^/[frontend] /"
}

if [[ ! -d "$ROOT_DIR/frontend/node_modules" ]]; then
  echo "Installing frontend dependencies..."
  (cd "$ROOT_DIR/frontend" && "$NPM_CMD" install)
fi

echo "Starting frontend: $FRONTEND_URL"
(
  cd "$ROOT_DIR/frontend"
  "$NPM_CMD" run dev -- --host 0.0.0.0 --port "$FRONTEND_PORT" >> "$FRONTEND_LOG" 2>&1
) &
FRONTEND_PID=$!

tail -n +1 -F "$FRONTEND_LOG" 2>/dev/null | prefix_log &
FRONTEND_TAIL_PID=$!

write_metadata "running"

cat <<EOF

Dev server is starting.
Frontend: $FRONTEND_URL
Metadata: $METADATA_ENV
Log:      $FRONTEND_LOG

Press Ctrl+C to stop.

EOF

wait "$FRONTEND_PID"
