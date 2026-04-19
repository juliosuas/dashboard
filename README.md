<div align="center">

# 🎛️ Orchestrator

### **The command center for developers who refuse to waste time.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?style=for-the-badge&logo=bun&logoColor=fbf0df)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![Made by juliosuas](https://img.shields.io/badge/Made%20by-juliosuas-blueviolet?style=flat-square)](https://github.com/juliosuas)

**Every PR · Every issue · Every repo · One keyboard · Zero tabs.**

[Features](#-features-v01) • [Quick Start](#-quick-start) • [Roadmap](#%EF%B8%8F-roadmap) • [Stack](#%EF%B8%8F-stack) • [Architecture](#%EF%B8%8F-architecture)

</div>

---

## ⚡ What is this?

**Orchestrator** is your local-first **PR command center**. Triage pull requests across every GitHub repo you touch, respond to comments, merge, manage issues, and keep a personal pendientes list — all from one keyboard-first dashboard running on your machine.

> **No SaaS. No subscription. No data leaves your computer.**
> You are the orchestrator.

## 🚀 Why build this?

Modern developers juggle dozens of repos. Every day you lose hours to:

- 🔍 Tab-hunting for PRs waiting on your review
- 🧠 Context-switching between projects
- ✉️ Inbox-zero rituals across GitHub notifications and Gmail
- 📋 Rewriting the same TODO list in five places

Orchestrator turns that into a **single, keyboard-driven view**. Your time is your power — stop giving it away.

## ✨ Features (v0.1)

| | Feature | Description |
|---|---------|-------------|
| 📥 | **PR Inbox** | Every PR across every repo that wants you — review-requested, assigned, or authored — in one list |
| ⌨️ | **Keyboard-first** | `j/k` navigate · `Enter` open · `a` approve · `R` request changes · `m` merge · `c` copy Claude cmd · `?` cheatsheet |
| 📝 | **Pendientes** | Local SQLite TODO list, optionally linked to a PR/issue, instant capture with `n` |
| 🐛 | **Issues view** | Open issues across your repos, grouped, filterable |
| 🤖 | **Claude Code handoff** | One keypress copies a context-aware command for [Claude Code](https://claude.com/claude-code) |
| 🔄 | **Live polling** | Inbox auto-refreshes every 60s; manual refresh on demand |
| 🔐 | **100% local** | Your token, your machine, your data. Nothing leaves localhost. |

## 🛣️ Roadmap

Orchestrator ships in incremental releases. Each version is usable on its own.

| Version | Scope | Status |
|---------|-------|:------:|
| **v0.1** | PR inbox · issues · pendientes · copy Claude command | 🚧 In progress |
| **v0.2** | ✨ **AI-drafted PR reviews & comments** — you dictate intent, Claude redacts, you approve, ship | 📅 Next |
| **v0.3** | 🎨 **Create/update PRs from the UI** — AI writes title + body | 📅 Planned |
| **v0.4** | 📬 **Gmail inbox + AI replies** — same flow for email | 📅 Planned |
| **v0.5** | 🔔 **Proactive cron** — AI watches your repos and emails/calendars when something's urgent | 📅 Planned |
| **v0.6** | 🧙 **Spawn Claude Code sessions** — launch tmux sessions with full context from the dashboard | 📅 Planned |

## 🛠️ Stack

<table>
<tr>
<td>

**Runtime**

![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=fbf0df)

</td>
<td>

**Framework**

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)

</td>
<td>

**Language**

![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)

</td>
</tr>
<tr>
<td>

**UI**

![Tailwind](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white) ![shadcn](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white)

</td>
<td>

**Local data**

![SQLite](https://img.shields.io/badge/better--sqlite3-003B57?style=flat-square&logo=sqlite&logoColor=white)

</td>
<td>

**GitHub**

![Octokit](https://img.shields.io/badge/Octokit-181717?style=flat-square&logo=github&logoColor=white)

</td>
</tr>
<tr>
<td>

**Client state**

![SWR](https://img.shields.io/badge/SWR-000000?style=flat-square&logo=vercel&logoColor=white)

</td>
<td>

**Testing**

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white) ![MSW](https://img.shields.io/badge/MSW-FF6A33?style=flat-square&logo=mswtool&logoColor=white)

</td>
<td>

**Dev workflow**

🧰 gstack (`/ship`, `/qa`, `/health`, `/review`)

</td>
</tr>
</table>

## 🏃 Quick start

```bash
# Clone
git clone https://github.com/juliosuas/dashboard.git
cd dashboard

# Install
bun install

# Configure
cp .env.example .env
# → open .env and paste your GitHub PAT

# Run
bun run dev
```

Open **http://localhost:3000** and let the cockpit take over.

### 🔑 GitHub PAT scopes

Create a classic token at **[github.com/settings/tokens/new](https://github.com/settings/tokens/new)** with:

- ✅ `repo`
- ✅ `read:org`
- ✅ `read:user`

Paste it into `.env` as `GITHUB_TOKEN=ghp_…`.

## 🧪 Development

```bash
bun test           # unit + integration (Vitest + MSW)
bun run test:e2e   # Playwright E2E
bun run typecheck  # tsc --noEmit
bun run lint       # Next.js lint
bun run build      # production build
```

All green before you ship. Non-negotiable.

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────┐
│        Browser  (http://localhost:3000)           │
│   React Server Components · SWR · shadcn/ui       │
└────────────────────────┬──────────────────────────┘
                         │ same-origin fetch
┌────────────────────────▼──────────────────────────┐
│            Next.js 16  (App Router)               │
│           API routes · Node runtime               │
│                                                   │
│   ┌──────────────┐          ┌─────────────────┐   │
│   │   Octokit    │          │ better-sqlite3  │   │
│   │   + TTL      │          │  (pendientes +  │   │
│   │   cache 30s  │          │    settings)    │   │
│   └──────┬───────┘          └─────────────────┘   │
└──────────┼────────────────────────────────────────┘
           │
     ┌─────▼─────┐
     │  GitHub   │
     │    API    │
     └───────────┘
```

- 🧠 **Server-side cache** protects the 5 000 req/hr GitHub rate limit
- 🔄 **Client-side SWR** polls every 60s and mutates optimistically
- 💾 **SQLite** stores only what doesn't live on GitHub (pendientes, settings)
- 🚫 **No external services** — no Redis, no Postgres, no cloud workers

## 📂 Project structure

```
dashboard/
├── app/              # Next.js App Router pages + API routes
│   ├── (pages)/      # inbox, issues, pendientes, settings, setup
│   └── api/          # /api/prs, /api/issues, /api/pendientes, /api/settings
├── components/       # UI (shadcn + custom)
├── lib/
│   ├── github/       # Octokit client, inbox, pr-detail, actions
│   └── db/           # SQLite client, pendientes, settings
├── hooks/            # React hooks (use-settings, …)
├── tests/
│   ├── unit/         # Vitest
│   ├── integration/  # API route tests with MSW
│   └── e2e/          # Playwright
└── docs/
    └── superpowers/  # Design specs + implementation plans
        ├── specs/
        └── plans/
```

## 🤝 Contributing

Orchestrator is MIT-licensed open source. Issues, PRs, and ideas welcome — especially once v0.1 ships.

If you want to build something in the same direction, fork freely.

## 📜 License

**MIT** © [**juliosuas**](https://github.com/juliosuas)

---

<div align="center">

**Built with 💻, shipped with ⚡ — for developers who value their time.**

⭐ **Star this repo** if Orchestrator saves you a minute. It usually saves hours.

</div>
