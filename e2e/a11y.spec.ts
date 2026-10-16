import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import { caseStudies, site } from "@/content";
import { revealEmail } from "./helpers";

// Automated accessibility checks with axe: contrast, names for links and buttons, heading and
// landmark structure, valid ARIA and more. It can't judge everything (e.g. whether alt text makes
// sense), so it backs up a manual pass instead of replacing it.
const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(wcagTags)
    .analyze();
  // Listing the rule ids and offending elements makes a failure readable in CI.
  const summary = violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
  );
  expect(summary).toEqual([]);
}

const paths = [
  ...site.nav.map((link) => link.href),
  ...caseStudies.map((project) => `/projects/${project.slug}`),
  "/no-such-page",
];

for (const path of paths) {
  test(`${path} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await expectNoViolations(page);
  });
}

test("contact page has no violations after the email is revealed", async ({
  page,
}) => {
  await page.goto("/contact");
  await revealEmail(page);
  await expectNoViolations(page);
});

// WCAG "reflow": at 320px wide (a phone, or a laptop zoomed to 400%) nothing should need sideways
// scrolling.
for (const path of paths) {
  test(`${path} fits a 320px-wide screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("skip link is the first stop and jumps to the main content", async ({
  page,
  isMobile,
}) => {
  // Phones have no Tab key, so there's nothing to test there.
  test.skip(isMobile, "keyboard-only");
  await page.goto("/resume");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
