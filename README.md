# Website Transit Navigation

Frontend-only landing page that guides users to preconfigured website entrances. No backend, database, Java, or Maven setup is required.

## Overview

- Frontend: React functional components, Vite, Tailwind CSS, and Lucide React.
- Navigation links are configured in `frontend/src/data/defaultLinks.js`.
- Dev script: `run-dev.sh` reads `.env`, starts the Vite frontend, streams logs, and writes runtime port/PID/URL metadata to `.logs/`.

## Project Structure

```text
.
|-- frontend/
|   |-- package.json
|   |-- vite.config.js
|   `-- src/
|       |-- components/
|       |-- data/
|       |-- hooks/
|       |-- lib/
|       |-- main.jsx
|       `-- styles.css
|-- .env
|-- .env.example
|-- run-dev.sh
`-- README.md
```

## Requirements

- Node.js and npm.
- Bash to run `run-dev.sh` on Windows through Git Bash or WSL.

## Quick Start

```bash
./run-dev.sh
```

By default, the frontend runs at:

```text
http://localhost:5173
```

The script will:

- Install frontend dependencies if `node_modules` is missing.
- Start the Vite frontend.
- Stream logs with the `[frontend]` prefix.
- Write logs to `.logs/frontend.dev.log`.
- Write runtime metadata to `.logs/dev-servers.env` and `.logs/dev-servers.json`.
- Stop the process when you press `Ctrl+C`.

## Environment Configuration

The project includes `.env` for local development and `.env.example` as a reference for other environments. Environment variables passed directly to the command take priority over values from `.env`.

```env
FRONTEND_HOST=localhost
FRONTEND_PORT=5173
NPM_CMD=npm
```

## Change The Port

```bash
FRONTEND_PORT=5174 ./run-dev.sh
```

## Run The Frontend Directly

```bash
cd frontend
npm install
npm run dev
```

## Edit Navigation Links

Update the link list in:

```text
frontend/src/data/defaultLinks.js
```

Each item uses these main fields:

- `title`: display name.
- `description`: short description.
- `targetUrl`: destination URL opened when the user clicks the entrance.
- `iconType`: one of the supported icons (`home`, `cloud`, `globe`, `megaphone`, `route`, `shield`, `radio`).
- `priority`: display priority; lower numbers appear first.

## Build

```bash
cd frontend
npm run build
```

## Quick Check

After running `./run-dev.sh`:

```bash
curl http://localhost:5173
```

Expected result: the frontend returns the Vite app HTML, and the UI displays the entrance list from `frontend/src/data/defaultLinks.js`.

## Troubleshooting

### Port 5173 Is Already In Use

Use another port:

```bash
FRONTEND_PORT=5174 ./run-dev.sh
```

Or find the process that owns the port on Windows:

```powershell
netstat -ano | Select-String ":5173"
```

### PowerShell Blocks npm.ps1

Use `npm.cmd` or run the command through Bash/Git Bash:

```powershell
& "C:\Program Files\node-v24.13.1-win-x64\npm.cmd" run build
```

### View Runtime Logs

```bash
tail -f .logs/frontend.dev.log
```

PowerShell:

```powershell
Get-Content .logs/frontend.dev.log -Wait
```
