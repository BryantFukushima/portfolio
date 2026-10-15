<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio

Bryant Fukushima's personal portfolio site. Built step by step following `ROADMAP.md`; learnings go in `NOTES.md`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4 (theme tokens live in `src/app/globals.css` under `@theme`, there is no `tailwind.config.js`)
- Prettier + ESLint, deployed on Vercel

## Commands

- `npm run dev`: local dev server at http://localhost:3000
- `npm run check`: typecheck + lint + format check. Must pass before any commit; the git pre-commit hook (`.githooks/pre-commit`) enforces it.
- `npm run build`: production build
- `npm run format`: format everything with Prettier

## Conventions

- TypeScript strict: no `any`, no `@ts-ignore`. Type component props and data shapes explicitly; let inference handle the rest.
- Server components by default. Add `"use client"` only when a component needs browser interactivity (state, effects, event handlers), and keep client components small.
- Import with the `@/` alias (`@/components/...`), not long relative paths.
- Keep content (text, links, experience, projects) in `src/content/`, never hardcoded in components.
- Small, focused components. No new dependencies without asking first.

## Design system

- Dark theme only. Deep purple background.
- Subtle vaporwave accents: teal, magenta, yellow. Use sparingly for highlights, links and focus states, never for body text.
- Developer/terminal/CLI feel: monospace type, prompt-style headings (`$ whoami`), blinking cursor, command-style nav.
- Readability first: body text is calm and high-contrast (WCAG AA). Respect `prefers-reduced-motion` for animations.
- Use theme tokens from `globals.css`, not raw hex values in components.

## Workflow

- Work on one `ROADMAP.md` step at a time. Don't build features from later steps.
- Propose a plan and wait for approval before writing code.
- I'm still learning TypeScript: briefly explain new TS concepts that appear in your changes.
- Don't commit or push until all changes are approved. Then make a short, brief commit summary and push.
