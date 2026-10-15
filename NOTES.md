# Build Notes

What I learned and decided at each step.

## Phase 1

### Step 1: Scaffold + run locally

- `ROADMAP.md` breaks the build into phases and small steps, each with a clear "done when". It keeps work organized (one branch per phase, a few commits per step) and gives AI tools context so each step stays scoped.
- Components are server components by default and ship no JavaScript to the browser. `"use client"` is opt-in, only for interactivity (state, effects, event handlers).

### Step 2: Harness setup

- Project rules live in `AGENTS.md`, the cross-tool convention most AI coding agents read. `CLAUDE.md` stays thin: it imports `AGENTS.md` and only adds Claude-specific notes. Next.js manages its own block in `AGENTS.md`, so my rules go below it.
- Prettier handles formatting, ESLint catches bugs and bad patterns, and TypeScript checks types. `npm run check` runs all three and must pass before every commit.
- Enforcement is layered: Claude Code hooks give fast feedback while Claude works, and a git pre-commit hook runs `npm run check` on every commit, so my own manual edits are covered too. CI (step 3) will be the final backstop.
- The `prepare` script sets `core.hooksPath` on `npm install`, so a fresh clone gets the pre-commit hook automatically.

### Step 3: GitHub + CI + Vercel

- GitHub Actions runs `npm ci`, `npm run check` and `npm run build` on every push. It's the backstop: I proved it by pushing a type error with `--no-verify` (which skips the pre-commit hook), and CI still failed.
- CI starts from a clean checkout, so anything gitignored or generated isn't there. My first run failed because `LayoutProps` lives in `.next/types/`, which only `next dev`/`build` create. Fix: `typecheck` runs `next typegen` first.
- `.nvmrc` pins Node 24 so my machine, CI and Vercel all run the same version.
- Vercel deploys `main` to production and gives every other branch a preview URL. Branch protection on `main` requires CI to pass before merging.
