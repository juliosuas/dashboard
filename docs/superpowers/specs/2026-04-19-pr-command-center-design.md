# Design: Orchestrator — PR Command Center (v0.1)

**Date:** 2026-04-19
**Owner:** juliosuas
**Status:** Draft — pending user review
**Repo:** `juliosuas/gitshiproom` (public, to be created on first push)

---

## 1. Problem

As a developer with multiple projects on GitHub, I lose time:

- Switching between tabs to find PRs awaiting my review
- Context-switching into each repo to triage issues
- Forgetting what I was working on yesterday
- Manually copying repo/issue context into Claude Code

I want a single local web dashboard that is the **control tower** for my dev work. I am the orchestrator: I give high-level intent, the tool surfaces what matters and stages actions.

## 2. Goals (v0.1)

1. See **all PRs awaiting my attention across all my repos** in one place.
2. Review, approve, request changes, merge, comment on PRs **with keyboard shortcuts** and minimal clicks.
3. See **issues** across my repos, filterable.
4. Keep a **local pendientes list** (todos) linkable to PRs/issues.
5. Copy a ready-to-use **Claude Code command** for any PR/issue into clipboard.
6. Self-updating UI (polling every 60s, manual refresh available).

## 3. Non-goals (v0.1)

Explicitly out of scope to keep v0.1 shippable in days, not weeks:

- AI-drafted comments/replies → **v0.2**
- Creating/updating PRs from the UI → **v0.3**
- Gmail inbox integration → **v0.4**
- Cron-based proactive notifications (email / Calendar events) → **v0.5**
- Spawning Claude Code sessions from the UI → **v0.6**
- Multi-user, auth, cloud deployment, mobile
- Notifications push (no SSE in v0.1 — pure polling)
- GitHub Enterprise / GHES (github.com only)

## 4. Success criteria

v0.1 is successful when:

- From `bun dev` to seeing my real PRs takes **< 2 minutes** (config + launch).
- I can **approve a PR without touching the mouse** (`j/k` to navigate, `a` to approve).
- My pendientes persist across restarts.
- I use it for a week and stop opening github.com tabs for PR review.

## 5. User flows

### 5.1 First launch

1. Run `bun dev` in repo root.
2. Browser opens `http://localhost:3000`.
3. If no `GITHUB_TOKEN` in `.env`: setup screen explains how to create a PAT and where to put it.
4. Once token is present: list of repos loads from `GET /user/repos`.
5. Dashboard shows "PR Inbox" with all PRs needing review.

### 5.2 Review a PR (happy path)

1. User sees PR inbox. Presses `j` until the target PR row is focused.
2. Presses `Enter` → opens PR detail (diff + comments + CI status).
3. Reads diff. Presses `a` → confirm modal → approves via GitHub API.
4. Optimistic UI: PR disappears from inbox immediately.
5. On API failure: toast error, PR reappears in inbox.

### 5.3 Capture a pendiente

1. User presses `n` (new pendiente) anywhere.
2. Modal opens: text field + optional "link to current PR/issue".
3. `Ctrl+Enter` saves to SQLite.
4. Pendiente appears in the sidebar.

### 5.4 Copy Claude command

1. User focuses a PR or issue row, presses `c`.
2. Clipboard receives: `cd ~/Projects/github/<repo> && claude "Work on PR #123: <title>"`.
3. Toast: "Command copied. Paste in terminal."
4. The command template is configurable in settings (v0.1 has a sensible default).

## 6. Architecture

```
┌─────────────────────────────────────────────────┐
│            Browser (localhost:3000)             │
│  ┌───────────────┐    ┌──────────────────────┐  │
│  │ Next.js RSC   │    │ Client Components    │  │
│  │ (PR Inbox,    │◄───│ (shadcn/ui, SWR,     │  │
│  │  Issues, PR   │    │  keyboard handlers)  │  │
│  │  Detail)      │    └──────────────────────┘  │
│  └───────┬───────┘                              │
└──────────┼──────────────────────────────────────┘
           │ fetch (same origin)
┌──────────▼──────────────────────────────────────┐
│          Next.js API Routes (Node runtime)      │
│  /api/prs  /api/issues  /api/pendientes         │
│  /api/repos  /api/actions/approve ...           │
│       │              │                 │        │
│       ▼              ▼                 ▼        │
│  ┌─────────┐   ┌──────────┐      ┌─────────┐    │
│  │ Octokit │   │ In-mem   │      │ better- │    │
│  │ (GitHub │   │ cache    │      │ sqlite3 │    │
│  │  API)   │   │ (30s TTL)│      │ (local) │    │
│  └─────────┘   └──────────┘      └─────────┘    │
└─────────────────────────────────────────────────┘
```

### Runtime

- **Next.js 16** (App Router). Single repo, UI + API.
- **Bun** as package manager and dev runtime (`bun dev` wraps `next dev`).
- **SQLite** via `better-sqlite3` (synchronous, fits Node API routes, zero ops).
- **Octokit** (`@octokit/rest`) for GitHub API calls.
- **SWR** on client for polling (60s interval, manual `mutate()` for optimistic).

### Why these choices

| Choice | Why |
|--------|-----|
| Next.js over Vite + Hono | One-repo UX, Server Components for SEO-less but fast rendering, API routes colocated |
| Bun over Node | Faster install/start, native TS, matches user's gstack preferences |
| SQLite over Postgres | Local-only app, single user, zero setup |
| SWR polling over SSE | v0.1 simplicity; SSE can be added in v0.5 with cron |
| In-memory cache 30s | Protects the 5000 req/hr rate limit without DB complexity |

## 7. Data model

### 7.1 SQLite schema (`data/orchestrator.db`)

```sql
CREATE TABLE pendientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT,
  linked_url TEXT,            -- e.g. https://github.com/user/repo/pull/42
  linked_kind TEXT,           -- 'pr' | 'issue' | null
  done INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  done_at TEXT
);

CREATE INDEX idx_pendientes_done ON pendientes(done, created_at DESC);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
-- v0.1 seeded keys:
--   claude_command_template: template with {repo_dir}, {repo_name}, {kind}, {number}, {title} placeholders
--     default: 'cd {repo_dir} && claude "Work on {kind} #{number}: {title}"'
--   repo_dir_root: default base path for cloned repos
--     default: '~/Projects/github'
```

### 7.2 GitHub data (not persisted)

PRs, issues, repos — fetched live and cached in-memory for 30s. No SQLite persistence in v0.1. Rationale: single user, fast network, eliminates stale-data bugs.

Repo scope: v0.1 surfaces **all repos the authenticated user can access** (owner + org member, no forks). Users filter in the UI. Organization-based filtering is deferred to v0.2+ if needed.

### 7.3 Secrets

- `GITHUB_TOKEN` — personal access token, scopes `repo`, `read:org`, `read:user`.
- Stored in `.env` (gitignored). Never committed.
- Loaded at server start via `process.env`.

## 8. Components

### 8.1 Server (API routes)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/repos` | GET | List user's repos (Octokit `repos.listForAuthenticatedUser`) |
| `/api/prs/inbox` | GET | PRs requiring user action (search API: `is:pr is:open review-requested:@me OR author:@me`) |
| `/api/prs/[owner]/[repo]/[number]` | GET | PR detail: diff, comments, CI checks |
| `/api/prs/[owner]/[repo]/[number]/review` | POST | Approve / request changes / comment (body: `{event, body}`) |
| `/api/prs/[owner]/[repo]/[number]/merge` | POST | Merge PR |
| `/api/issues` | GET | Issues across tracked repos, filterable |
| `/api/pendientes` | GET / POST | List / create pendientes |
| `/api/pendientes/[id]` | PATCH / DELETE | Update / delete |
| `/api/settings` | GET / PATCH | Read / update settings |

Each route is a file under `app/api/.../route.ts`. Thin handlers, logic in `lib/`.

### 8.2 Client (pages)

| Page | Route | Notes |
|------|-------|-------|
| Dashboard | `/` | Redirects to `/inbox` |
| PR Inbox | `/inbox` | Main view: table of PRs, keyboard nav, filters |
| PR Detail | `/pr/[owner]/[repo]/[number]` | Diff, comments, actions sidebar |
| Issues | `/issues` | Table of issues, group by repo |
| Pendientes | `/pendientes` | Lateral or dedicated page — decided during design polish |
| Settings | `/settings` | Token status, tracked orgs, Claude command template |

### 8.3 Library modules (`lib/`)

```
lib/
├── github/
│   ├── client.ts         # Octokit singleton with in-mem cache wrapper
│   ├── inbox.ts          # Build "PRs awaiting me" list
│   ├── pr-detail.ts      # Fetch diff + comments + checks for a PR
│   └── actions.ts        # review(), merge(), comment() primitives
├── db/
│   ├── client.ts         # better-sqlite3 singleton
│   ├── migrations.ts     # Run at startup
│   └── pendientes.ts     # CRUD for pendientes
├── cache.ts              # Simple TTL map
└── shortcuts.ts          # Keyboard shortcut registry (shared config)
```

One module = one clear responsibility. No file should need >300 lines. If it does, split.

## 9. Keyboard shortcuts (v0.1)

Global:
- `g i` → go inbox
- `g s` → go issues
- `g p` → go pendientes
- `/` → focus search
- `n` → new pendiente (modal)
- `?` → cheatsheet modal

PR Inbox list:
- `j` / `k` → next / prev row
- `Enter` → open detail
- `c` → copy Claude command for focused PR
- `r` → refresh inbox

PR Detail:
- `a` → approve (confirm modal)
- `R` → request changes (textarea modal)
- `m` → merge (confirm modal, guarded if CI red)
- `c` → copy Claude command
- `Esc` → back to inbox

Implementation: a single `useShortcut(key, handler, scope)` hook reading from `lib/shortcuts.ts`. Conflicts resolved by scope priority.

## 10. Real-time strategy (v0.1)

Polling only.

- Client-side: SWR revalidates `/api/prs/inbox` every 60s. `refreshInterval: 60_000`.
- Server-side: each `/api/prs/inbox` hit checks in-memory cache (30s TTL). Cache miss → Octokit → fill cache.
- Manual refresh: `r` key triggers `mutate()` client-side, bypassing cache via `?fresh=1` param.
- Optimistic UI: actions update local state immediately, rollback on error.

Future (v0.5): add SSE channel that pushes when the cron detects changes.

## 11. Error handling

- **Missing token:** setup screen, block all data routes until fixed.
- **GitHub 401/403:** toast "Token expired or missing scopes" + link to settings.
- **GitHub 5xx:** retry with exponential backoff (max 2), then toast and keep stale data visible.
- **Rate limit (`x-ratelimit-remaining: 0`):** badge shows reset time, polling pauses automatically.
- **Optimistic action failure:** rollback UI state, toast error, log details to browser console.
- **DB errors:** log to server, return 500, client shows toast.

## 12. Testing

- **Unit tests** (Vitest): `lib/db/pendientes.ts`, `lib/cache.ts`, `lib/shortcuts.ts`.
- **Integration tests** (Vitest + MSW mocking Octokit): each API route, happy path + error paths.
- **E2E** (Playwright, headed via gstack `/browse`): smoke test — load inbox, approve a (mocked) PR, create a pendiente.
- **Manual QA** via gstack `/qa` after each version ships.

Target v0.1 coverage: lib/ at 90%+, routes at 80%+, E2E smoke only.

## 13. Configuration & secrets

### Files

```
.env                       # GITHUB_TOKEN, DB_PATH (gitignored)
.env.example               # Template, committed
config.json                # User settings (tracked_orgs, etc.) — optional, also editable via UI
data/orchestrator.db       # SQLite, gitignored
```

### `.env.example`

```
GITHUB_TOKEN=ghp_xxx
DB_PATH=./data/orchestrator.db
PORT=3000
```

### README guidance

README explains: create PAT with scopes `repo`, `read:org`, `read:user`; copy `.env.example` to `.env`; `bun install && bun dev`.

## 14. Deployment & repo

- Local-only. No hosting.
- Repo created on GitHub as `juliosuas/gitshiproom` (public) using `gh repo create` during first push.
- README: what it does, screenshots, setup, roadmap table (v0.1 → v0.6), tech stack.
- LICENSE: MIT (consistent with user's other public repos — to confirm during implementation).

## 15. Project structure

```
gitshiproom/
├── app/
│   ├── (routes)/
│   │   ├── inbox/page.tsx
│   │   ├── pr/[owner]/[repo]/[number]/page.tsx
│   │   ├── issues/page.tsx
│   │   ├── pendientes/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── prs/...
│   │   ├── issues/...
│   │   ├── pendientes/...
│   │   ├── repos/route.ts
│   │   └── settings/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/               # shadcn
│   ├── pr-inbox-table.tsx
│   ├── pr-detail.tsx
│   ├── shortcut-provider.tsx
│   └── ...
├── lib/                  # (see §8.3)
├── data/                 # SQLite file (gitignored)
├── docs/
│   └── superpowers/specs/2026-04-19-pr-command-center-design.md
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── CHANGELOG.md
├── VERSION               # "0.1.0" at ship
└── README.md
```

## 16. Roadmap beyond v0.1

| Version | Scope | Adds to stack |
|---------|-------|---------------|
| v0.2 | AI-drafted PR comments/reviews | `@anthropic-ai/sdk`, prompt cache |
| v0.3 | Create/update PRs from UI | `simple-git` or shell out to `gh` |
| v0.4 | Gmail inbox + AI replies | Google OAuth + Gmail API |
| v0.5 | Cron proactive notifications | `node-cron`, SSE, Calendar API |
| v0.6 | Launch Claude Code from UI | `tmux` wrapper + log streaming |

Each version ships as a merged PR with its own mini-spec in `docs/superpowers/specs/`.

## 17. Open questions (to resolve during implementation)

None blocking v0.1. Decisions to revisit when we reach each version:

- v0.2: Opus 4.7 vs Sonnet 4.6 for drafts (cost vs quality)
- v0.4: Use Google OAuth in-app vs rely on the existing Gmail MCP
- v0.5: Where does cron run — in the Next.js process, or a separate Bun script + systemd user unit?
- v0.6: tmux vs pty library for Claude Code spawning

## 18. What "done" looks like for v0.1

- Repo `juliosuas/gitshiproom` exists, public, with a README that a stranger can follow to run it.
- `bun install && bun dev` starts the app cleanly on a fresh machine (assuming Bun installed, `.env` configured).
- PR inbox loads real PRs from my repos.
- I can approve / request changes / merge via keyboard only.
- Pendientes persist across restarts.
- `gstack /health` returns a composite score ≥ 7/10.
- v0.1 is tagged and merged to main.
