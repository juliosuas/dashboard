<div align="center">

# 🚢 GitShipRoom

### **Your private ship-room. Every PR. Every repo. One keyboard.**

*Stop drowning in tabs. Start shipping like it's your job — because it is.*

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?style=for-the-badge&logo=bun&logoColor=fbf0df)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![Made by juliosuas](https://img.shields.io/badge/Made%20by-juliosuas-blueviolet?style=flat-square)](https://github.com/juliosuas)
[![Local-first](https://img.shields.io/badge/Local--first-✓-success?style=flat-square)]()

**Every PR · Every issue · Every repo · One keyboard · Zero tabs.**

[Why](#-why-you-need-this) • [Features](#-whats-inside-v01) • [Quick Start](#-quick-start) • [Roadmap](#%EF%B8%8F-the-roadmap) • [Stack](#%EF%B8%8F-built-with) • [Credits](#-credits--acknowledgments)

</div>

---

## 💥 Why you need this

You're juggling **12 repos**. You switched tabs **47 times today**. Half the PRs you're supposed to review are buried in email. Your TODO list is spread across Notion, a sticky note, and `~/.notes-final-FINAL.md`.

You're not slow. **Your tooling is.**

**GitShipRoom** is a local-first command center that pulls every PR, every issue, every pending task into **one keyboard-driven dashboard** running on your machine. No SaaS. No subscription. No data ever leaves `localhost`.

> You are the orchestrator. GitShipRoom is your cockpit.

## 🔥 What's inside (v0.1)

| | Feature | Description |
|---|---------|-------------|
| 📥 | **Unified PR Inbox** | Every PR that wants you, across every repo — review-requested, assigned, authored — in one list |
| ⌨️ | **Keyboard-first** | `j/k` navigate · `Enter` open · `a` approve · `R` request changes · `m` merge · `c` copy Claude cmd · `?` cheatsheet |
| 📝 | **Pendientes** | Local SQLite TODO list, optionally linked to any PR/issue. Capture instantly with `n` |
| 🐛 | **Issues view** | Open issues across your repos, grouped and filterable |
| 🤖 | **Claude Code handoff** | One keypress copies a context-aware command for [Claude Code](https://claude.com/claude-code) |
| 🔄 | **Live polling** | Inbox auto-refreshes every 60s; manual refresh on demand |
| 🔐 | **100% local** | Your token, your machine, your data. Nothing leaves your box. |

## 🛣️ The roadmap

GitShipRoom ships in waves. Each version is usable on its own — you get value at every step.

| Version | What ships | Status |
|---------|-----------|:------:|
| **v0.1** | PR inbox · issues · pendientes · copy Claude command | 🚧 Building |
| **v0.2** | ✨ **AI-drafted PR reviews** — dictate intent, Claude redacts, you approve, ship | 📅 Next |
| **v0.3** | 🎨 **Create/update PRs from the UI** — AI writes title + body from your intent | 📅 Planned |
| **v0.4** | 📬 **Gmail inbox + AI replies** — same orchestrator flow, for email | 📅 Planned |
| **v0.5** | 🔔 **Proactive cron** — AI watches your repos and emails/calendars when something's urgent | 📅 Planned |
| **v0.6** | 🧙 **Spawn Claude Code sessions from the UI** — tmux, full context, one click | 📅 Planned |

## 🏃 Quick start

```bash
# Clone
git clone https://github.com/juliosuas/gitshiproom.git
cd gitshiproom

# Install (you need Bun — https://bun.sh)
bun install

# Configure
cp .env.example .env
# → open .env and paste your GitHub PAT

# Launch
bun run dev
```

Open **http://localhost:3000** and let the cockpit take over.

### 🔑 GitHub PAT scopes

Create a classic token at **[github.com/settings/tokens/new](https://github.com/settings/tokens/new)** with:

- ✅ `repo`
- ✅ `read:org`
- ✅ `read:user`

Paste it into `.env` as `GITHUB_TOKEN=ghp_…`.

## 🛠️ Built with

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

- 🧠 **Server-side cache** protects GitHub's 5 000 req/hr rate limit
- 🔄 **Client-side SWR** polls every 60s with optimistic mutations
- 💾 **SQLite** stores only what doesn't live on GitHub (pendientes, settings)
- 🚫 **No external services** — no Redis, no Postgres, no cloud workers

## 📂 Project structure

```
gitshiproom/
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

## 🙌 Credits & acknowledgments

GitShipRoom stands on the shoulders of a lot of great open-source work. Shout-outs to:

### Core stack
- **[Next.js](https://nextjs.org/)** and **[SWR](https://swr.vercel.app/)** by [Vercel](https://vercel.com/)
- **[Bun](https://bun.sh/)** by [Oven](https://oven.sh/)
- **[Tailwind CSS](https://tailwindcss.com/)** by Tailwind Labs
- **[shadcn/ui](https://ui.shadcn.com/)** by [@shadcn](https://github.com/shadcn)
- **[Radix UI](https://www.radix-ui.com/)** — the primitives under shadcn
- **[Lucide](https://lucide.dev/)** — the icon set
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** by WiseLibs
- **[Octokit](https://github.com/octokit)** — GitHub's official SDK

### Testing & tooling
- **[Vitest](https://vitest.dev/)** & **[MSW](https://mswjs.io/)** for fast, realistic unit/integration tests
- **[Playwright](https://playwright.dev/)** by Microsoft for E2E
- **[TypeScript](https://www.typescriptlang.org/)** by Microsoft

### Workflow & inspiration
- **[Claude Code](https://claude.com/claude-code)** by [Anthropic](https://anthropic.com/) — used as a pair-programming tool during spec and plan authoring
- **gstack** — dev-loop skills (`/ship`, `/review`, `/qa`, `/health`, `/investigate`)
- **superpowers** plugin — brainstorming / planning / subagent-driven workflows
- **[GitHub](https://github.com/)** — the platform we orchestrate
- UX inspiration: **[Linear](https://linear.app/)**, **[Raycast](https://raycast.com/)**, **[Warp](https://warp.dev/)** — keyboard-first done right

### The author
GitShipRoom is designed, architected, and built by **[Julio · @juliosuas](https://github.com/juliosuas)**.

If this saves you hours, a ⭐ on the repo is the best thank-you.

## 🤝 Contributing

GitShipRoom is MIT-licensed open source. Issues, PRs, and ideas welcome — especially once v0.1 lands.

If you fork it and build something awesome, tag me.

## 📜 License

**MIT** © [**juliosuas**](https://github.com/juliosuas) · 2026

---

<div align="center">

**Built with 💻, shipped with ⚡ — for developers who value their time.**

⭐ **Star this repo** if GitShipRoom saves you a minute. It's designed to save hours.

</div>
