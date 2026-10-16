import { expect, test } from "@playwright/test";
import { site } from "@/content";

// The other tests turn animations off; this one needs the typing effect to run.
test.use({ contextOptions: { reducedMotion: "no-preference" } });

for (const link of site.nav) {
  test(`${link.href} shows the whole typed command, even when the font loads slowly`, async ({
    page,
  }) => {
    // A slow font, like a first visit on a phone. Safari worked out 1ch too small then, and the
    // typing box cut off the last letter ("whoam").
    await page.route(/\.woff2$/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });
    await page.goto(link.href);
    const command = page.locator("h1 .overflow-hidden");
    await expect(command).toHaveText(/.+/);

    // Wait for typing to finish, then the box must be as wide as its text. 1px allows for subpixel
    // rounding; the real bug hid a whole letter (about 12px).
    await expect(async () => {
      const [box, text] = await command.evaluate((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        return [
          el.getBoundingClientRect().width,
          range.getBoundingClientRect().width,
        ];
      });
      expect(box).toBeGreaterThanOrEqual(text - 1);
    }).toPass({ timeout: 5000 });
  });
}
