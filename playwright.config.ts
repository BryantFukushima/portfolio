import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

// Browser smoke tests in e2e/. Locally they reuse the running `next dev` on port 3000 (or start
// one), so there's no second build fighting over .next. In CI they run against the production
// build (`next start` after `npm run build`), as the Next.js testing guide recommends.
export default defineConfig({
  testDir: "e2e",
  // Fail CI if a `test.only` is left in by mistake.
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    // Skip the typing and fade-in animations, so tests don't wait on them.
    contextOptions: { reducedMotion: "reduce" },
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: isCI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCI,
  },
});
