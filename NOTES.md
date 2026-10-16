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

### Step 6: Home: hero + about

- The home page reads like the output of `whoami`: name, title, pitch and links, then a `cat about.txt` section. The hero and about fade in once the command finishes typing (skipped with reduced motion).
- One `h1` per page. Section titles use the same prompt style as `h2`s, so screen readers and search engines get a proper heading outline.
- All text lives in `profile.ts` (pitch, about paragraphs) and is validated like the rest of the content. Home gets its own schema built from the page schema with `.omit()` and `.extend()`.
- Skipped a headshot for now, so `next/image` moves to step 9 for project screenshots.

### Step 7: Resume page

- `/resume` follows the PDF: summary, experience, skills, education. Each section is a small component that takes typed data as props (`roles: Role[]`), so the page is just layout and all the text comes from `src/content/`.
- Section headings are Markdown-style (`## Experience`), since the page is the output of `cat resume.md`. The `##` is `aria-hidden`.
- Files in `public/` are served as-is from the site root. The PDF link is a plain `<a download>`, not `<Link>`, because it's a file, not a page. It's the web version of the resume, without phone or email.
- Dates are stored as `YYYY-MM` and formatted with a fixed month list instead of `Date`, so time zones can't shift a month. Each date sits in a `<time dateTime>` element so machines can read it too.

### Step 8: Contact page

- The repo is public, so the email can't live in `src/content/`. It's in the `CONTACT_EMAIL` env var: `.env.local` locally (gitignored) and Vercel's Environment Variables in production. No `NEXT_PUBLIC_` prefix, or Next.js would bake it into the browser JavaScript.
- A Server Action (`"use server"`) reads it only when "show email" is clicked. The email isn't in the HTML, the JS bundle or the repo. The action is a public POST endpoint, which is fine here: it takes no input and returns only what the page would show. Next.js rejects calls from other origins.
- `EmailReveal` is the only client component on the page (it needs a click handler and state). Everything else renders on the server. After the reveal, focus moves to the email link so keyboard users don't lose their place.
- If the env var is missing, the build still passes (it's only read on click) and the page shows a short error instead of crashing.

### Step 9: Projects + first case study

- `/projects/[slug]` is a dynamic route: the folder name in brackets matches any slug. `generateStaticParams()` lists the case studies so each page is built at build time. An unknown slug calls `notFound()` (Cache Components removed `dynamicParams`).
- Project details live in `projects.ts` and are checked by Zod. A discriminated union on `kind` means a case study must have a `slug` and a side project must have a `link`. Each case study's body is MDX in `src/content/projects/<slug>.mdx`, loaded with a dynamic `import()`.
- `src/mdx-components.tsx` (required by `@next/mdx`) styles Markdown elements to match the site, and makes `<ArchitectureDiagram>` usable in any MDX file without an import.
- The diagram is HTML lists, not an image, so it's real text: screen readers read it, it scales with the font and it stacks on mobile.
- The case study is about my own work (the problem, my role, results and lessons), not my employer's system. The company isn't named and there are no internal details: no service names, numbers, security specifics or roadmap. The stack is reduced to AWS ECS, Docker and CI/CD.

### Step 10: Tests

- On a mostly static site, the tests that matter guard where a mistake would ship silently: content rules, small helpers, and "does each page actually work in a browser". Not every component.
- Vitest runs unit tests in Node: every schema rule, the date and URL helpers, `getEmail()` with a fake env value, and checks on the real content (each case study has an MDX file, the resume PDF exists, no email or phone number in `src/content/`). They take under a second, so the pre-commit hook runs them too.
- Playwright smoke tests click through the site in Chromium: every page loads, the nav works, the PDF downloads, the email only appears after the click, and unknown projects 404. Locally they reuse `next dev`; in CI they run against the production build.
- The tests caught a real bug: with Cache Components, the first visit to an unknown `/projects/<slug>` returned 200, because the static shell starts streaming before `notFound()` runs. `src/proxy.ts` (Next 16's name for middleware) now checks the slug before rendering and serves a real 404.
- Bumped `@types/node` to 24 to match the Node version the site actually runs on.

### Step 11: Polish

**A. SEO, link previews, favicon**

- Metadata files are routes Next.js finds by name: `opengraph-image.tsx`, `icon.svg`, `apple-icon.tsx`, `sitemap.ts`, `robots.ts`. `metadataBase` (from `site.url`) turns relative paths into full URLs.
- Every page has its own description, canonical URL and Open Graph tags through one `pageMetadata()` helper. Lesson: a page's `openGraph` replaces the layout's whole object (including the image), so the helper sets every field.
- Link-preview cards are drawn with `next/og` in the terminal style, one per case study. The renderer only understands inline styles, flexbox and plain SVG tags (not React components), and it needs the font as a file, so JetBrains Mono's `.ttf` (open source, OFL) is in `src/assets/fonts/`. Reading it at module level lets the cards be built at build time.
- `src/lib/theme.ts` copies the palette for the images, and a test keeps it in sync with `globals.css`.
- Favicon: my `.ico` for older browsers, plus an `icon.svg` with the same design that switches to light strokes in dark mode (black lines vanish on dark tabs), and an Apple home-screen icon on white.
- JSON-LD "Person" data on the home page links my name to my GitHub and LinkedIn for search engines.
