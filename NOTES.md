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
- Vercel deploys `main` to production (https://portfolio-iota-one-40.vercel.app) and gives every other branch a preview URL. `bryantfukushima.com` waits until Phase 1 is done, so the domain never shows a half-built site. Branch protection on `main` requires CI to pass before merging.

### Step 4: Layout shell

- The root layout wraps every page, so the header, footer, font and skip link live there once. Nested layouts (a `layout.tsx` inside a route folder) add wrappers for just that section. I don't need one yet.
- `next/font` downloads JetBrains Mono at build time and serves it from my own domain: no requests to Google and no layout shift.
- Colors are Tailwind v4 `@theme` tokens (`--color-teal` → `text-teal`, `bg-teal`). `--color-*: initial` removes Tailwind's default palette, so only my tokens can be used.
- Only `NavLink` is a client component, because `usePathname()` needs the browser's current URL. Everything else renders on the server.
- Page titles type themselves out with CSS only (`steps()` + `ch` units, since the font is monospace). Lesson: tokens that use `var(--chars)` must go in `@theme inline`, or the variable resolves on `:root`, where it doesn't exist, and the animation silently does nothing.

### Step 5: Content layer

- Content lives in `src/content/` as typed data, separate from components: profile, experience, skills, education and site settings. In Phase 2 the data source becomes Postgres, but the schemas and pages stay the same.
- Zod schemas are the single source of truth. `z.infer<typeof RoleSchema>` generates the TypeScript type from the schema, so the type and the validation can't drift apart.
- TypeScript types disappear at runtime; Zod checks data while the code runs and covers rules TypeScript can't express (valid URLs, non-empty lists, end date after start date).
- `src/content/index.ts` validates every file, and every page imports from it, so bad content fails `next build` (and CI) with a message naming the file and field. Proved it with an end date before its start date: typecheck passed, the build failed.
- Kept my phone number and email off the site. The downloadable resume will be a web version of the PDF without them.
- Denied `unrs-resolver`'s install script with `npm deny-scripts` (its native binary already installs normally). CI now runs `npm audit --omit=dev`, so a vulnerability in code that ships fails the build. The current audit warnings are dev-only tooling with no patched version yet.
