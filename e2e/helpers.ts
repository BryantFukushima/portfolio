import { expect, type Page } from "@playwright/test";
import { site } from "@/content";

// In dev, a click can land before React has hydrated the button; retry until the email shows.
export async function revealEmail(page: Page) {
  const button = page.getByRole("button", {
    name: site.pages.contact.revealLabel,
  });
  // Matched by its mailto: address (other links, like the header's, contain "@" too).
  const email = page.locator('a[href^="mailto:"]');
  await expect(async () => {
    if (await button.isVisible()) await button.click();
    await expect(email).toBeVisible({ timeout: 1000 });
  }).toPass();
  return email;
}
