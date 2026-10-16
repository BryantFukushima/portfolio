# bryantfukushima.com

My portfolio: a terminal-style site with my resume, projects and contact info.

**Live:** [bryantfukushima.com](https://bryantfukushima.com)

## How this was built

I built this site step by step from [`ROADMAP.md`](ROADMAP.md), one small, reviewed step at a time, and wrote down what I learned at each step in [`NOTES.md`](NOTES.md). I built it with help from [Claude Code](https://claude.com/claude-code): it proposed a plan for each step, I approved or changed it, and nothing was committed until I had reviewed it.

### Stack

- **Next.js 16** (App Router, Cache Components) and **React 19**
- **TypeScript** in strict mode
- **Tailwind CSS v4**: theme tokens live in `src/app/globals.css`
- **MDX** for case studies, **Zod** for content validation
- **Vitest** and **Playwright** (with axe) for tests
- Hosted on **Vercel**, CI on **GitHub Actions**

### Architecture

- **Content is data.** All text, links, experience and projects live in `src/content/`, separate from the components. Zod schemas check every piece of content at build time, so a typo like a missing link or a duplicate slug fails the build instead of shipping.
- **Server components by default.** Almost every page is static HTML. The only client components are the ones that need the browser: the email reveal, the active nav link and the 404 page (which shows the path you typed).
- **Case studies are MDX** files in `src/content/projects/`, loaded by slug. `src/proxy.ts` sends unknown slugs to a real 404 before rendering.
- **SEO and link previews:** every page has its own title, description, canonical URL and Open Graph tags. Link-preview images are drawn in the terminal style with `next/og` at build time, one per case study. There's also a sitemap, robots.txt and JSON-LD.

### Design and accessibility

- A dark, deep-purple theme with teal, magenta and yellow accents. These colors are used only for highlights, never for body text.
- Monospace type and prompt-style headings (`$ whoami`, `cat resume.md`), with a blinking cursor.
- WCAG 2.2 AA: axe scans every page in CI. Tests also check that pages work at 320px wide with no sideways scrolling and that the skip link works. Links say when they open a new tab, focus is always visible, and animations turn off with `prefers-reduced-motion`.
- Lighthouse scores 97–100 on every page for Performance, and 100 for Accessibility, Best Practices and SEO (mobile and desktop).

### Privacy

- My email address isn't in the code or the HTML. It's an environment variable (`CONTACT_EMAIL`) that a server action returns only when someone clicks "show email", which keeps it away from scrapers.
- A test fails if an email address or phone number ever shows up in `src/content/`.
- Case studies describe my own work and lessons, not employer details.

### Tests and CI

- **Unit tests (Vitest):** schema rules, the date and URL helpers, the email action, and checks on the real content.
- **Browser tests (Playwright):** every page loads, the nav works, the resume PDF downloads, the email reveal works, unknown pages return 404, and there are the accessibility checks above.
- **CI** runs on every push: `npm audit`, typecheck, lint, format check, unit tests, a production build, then the browser tests against that build.
- A git pre-commit hook runs `npm run check` and the unit tests.

## Running it locally

Requires Node 24.

```bash
npm install
echo "CONTACT_EMAIL=you@example.com" > .env.local   # the address "show email" reveals
npm run dev                                          # http://localhost:3000
```

| Command            | What it does                                                     |
| ------------------ | ---------------------------------------------------------------- |
| `npm run dev`      | Dev server at http://localhost:3000                              |
| `npm run check`    | Typecheck, lint and format check                                 |
| `npm test`         | Unit tests                                                       |
| `npm run test:e2e` | Browser tests (run `npx playwright install chromium` once first) |
| `npm run build`    | Production build                                                 |
| `npm run format`   | Format everything with Prettier                                  |

## Credits

JetBrains Mono (used in the link-preview images) is under the SIL Open Font License; see `src/assets/fonts/OFL.txt`.
