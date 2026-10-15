# Portfolio Roadmap

Personal portfolio site, built in small, reviewable steps. Each phase has its own branch (`phase-1-frontend`, …); each step = one or a few commits on it.

## Design direction

- **Dark theme only.** Deep purple background.
- **Subtle vaporwave palette:** teal, magenta, yellow as accents (not neon overload).
- **Developer / terminal / CLI feel:** monospace type, prompt-style headings (`$ whoami`), blinking cursor, command-style nav.
- Readability first: accents for highlights, body text stays calm and high-contrast.

## Workflow per step

1. Ask for a plan first; adjust it before any code is written.
2. Let AI implement, then read the full diff. Ask "why?" about anything unfamiliar.
3. Change at least one thing by hand.
4. Once approved, commit with a short summary and push to the phase branch.
5. Add notes to `NOTES.md` on what I learned or decided (as long as it needs to be).

---

## Phase 1: Frontend-only site (ship ASAP)

- [x] **1. Scaffold + run locally**: `create-next-app` (TS, Tailwind, App Router, ESLint, `src/`)
  - Understand: `app/`, `layout.tsx`, `page.tsx`, server vs. client components
  - Done when: starter page runs at `localhost:3000`
- [x] **2. Harness setup**: `CLAUDE.md`, Prettier, `typecheck` script, lint/typecheck hooks
  - Understand: why each guardrail exists; write `CLAUDE.md` mostly myself
  - Done when: `npm run check` passes (typecheck + lint + format); hook catches a deliberate error
- [x] **3. GitHub + CI + Vercel**: push repo, GitHub Actions (install → check → build), connect Vercel
  - Understand: CI YAML line by line, preview deploys per PR
  - Done when: live URL exists, CI is green (https://portfolio-iota-one-40.vercel.app until step 12)
- [x] **4. Layout shell**: root layout, header/nav, footer, fonts, color tokens (vaporwave palette)
  - Understand: nested layouts, `next/font`, Tailwind v4 `@theme` tokens
  - Done when: empty but styled site with working nav is deployed
- [x] **5. Content layer**: `content/` with typed data + Zod schemas, filled from resume
  - Understand: content separate from components (swapped for Postgres in phase 2)
  - Done when: data imports cleanly; an invalid entry fails the build
- [ ] **6. Home: hero + about**: name, title, brief pitch, short about section, links, link to `/resume`
  - Understand: server components rendering content, `next/image`
  - Done when: home reads well on mobile and desktop
- [ ] **7. Resume page**: `/resume` follows my PDF resume's structure (experience timeline, skills, education), with a "Download PDF" link at the top (PDF in `public/`)
  - Understand: typed data → reusable components, serving static files
  - Done when: page is fully driven by content files, and the PDF downloads
- [ ] **8. Contact page**: `/contact` with GitHub + LinkedIn links and a click-to-reveal email
  - Understand: when a client component (`"use client"`) is actually needed; keeping the email out of the static HTML to deter scrapers
  - Done when: email only appears in the page after clicking
- [ ] **9. Projects + first case study**: projects grid, `/projects/[slug]`, ECS migration case study (MDX + diagram)
  - Understand: dynamic routes, `generateStaticParams`, MDX
  - Done when: case study page is live
- [ ] **10. Tests**: Vitest (schemas, utils), Playwright smoke test, both in CI
  - Understand: what's worth testing on a mostly static site
  - Done when: CI runs tests on every PR
- [ ] **11. Polish**: SEO, OG image, favicon, a11y pass, Lighthouse 95+, README "How this was built"
  - Done when: I'd send the link to a recruiter
- [ ] **12. Launch**: PR `phase-1-frontend` → `main` (CI must pass), connect `bryantfukushima.com` in Vercel
  - Understand: production vs. preview deploys, DNS records
  - Done when: `bryantfukushima.com` serves the Phase 1 site, and I send the link to a recruiter

## Phase 2: Database + admin CMS

Postgres (Neon) + Drizzle, auth-protected admin, move content from files to DB.

## Phase 3: "Ask about Bryant" AI chat

Claude API, full context + prompt caching (no vector DB at this scale), streaming, rate limits, spend cap, eval set in CI.

## Phase 4 (optional): AWS deploy with IaC

SST or Terraform deploy to AWS; write-up comparing it to Vercel.
