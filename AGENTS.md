# AGENTS.md

## Cursor Cloud specific instructions

This is the **Burla landing page** — a static marketing site served by a FastAPI backend. No database, no external APIs, no authentication required at runtime.

### Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS in `frontend/`. Dev server runs on port **8080**.
- **Backend**: FastAPI static file server in `src/landing_page/__init__.py`. Dev server runs on port **5002** with hot-reload.
- The frontend builds to `frontend/dist/` and is rsynced to `src/landing_page/static/` via `make build-frontend`.

### Running services

- **Frontend dev (hot-reload):** `cd frontend && npm run dev` → port 8080
- **Backend dev (serves built static files):** `make service` → port 5002 (requires `make build-frontend` first)
- See `makefile` for all available targets.

### Lint / Type-check

- TypeScript: `cd frontend && npx tsc --noEmit`
- No ESLint config exists in this project.
- No automated test suite exists.

### Gotchas

- `rsync` is not pre-installed in the Cloud VM; it must be installed via `sudo apt-get install -y rsync` before running `make build-frontend`.
- `uv` must be on `PATH` (`$HOME/.local/bin`). It is installed via `curl -LsSf https://astral.sh/uv/install.sh | sh`.
- The backend uses `uv run --project . --with fastapi --with uvicorn` to manage Python deps inline; there is no separate `pip install` step.
