import { expect, test } from "@playwright/test";
// Expectations come from the same content files as the site, so editing copy doesn't break tests.
import { caseStudies, profile, site } from "@/content";
import { revealEmail } from "./helpers";

const pages = [
  { path: "/", command: site.pages.home.command, title: profile.name },
  {
    path: "/resume",
    command: site.pages.resume.command,
    title: `Resume | ${profile.name}`,
  },
  {
    path: "/projects",
    command: site.pages.projects.command,
    title: `Projects | ${profile.name}`,
  },
  {
    path: "/contact",
    command: site.pages.contact.command,
    title: `Contact | ${profile.name}`,
  },
];

const emailPattern = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i;

for (const { path, command, title } of pages) {
  test(`${path} loads with its title and heading`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    // The prompt part is aria-hidden, so the heading's accessible name is just the command.
    await expect(
      page.getByRole("heading", { level: 1, name: command }),
    ).toBeVisible();
  });
}

test("nav links move between pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const { label, href } of site.nav) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(href);
    await expect(
      nav.getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
});

test("resume PDF downloads", async ({ page, request }) => {
  const { label, href } = site.pages.resume.download;
  await page.goto("/resume");
  await expect(page.getByRole("link", { name: label })).toHaveAttribute(
    "href",
    href,
  );
  const response = await request.get(href);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("application/pdf");
});

test("contact email only appears after clicking", async ({ page }) => {
  await page.goto("/contact");
  // page.content() is the full HTML, including the data React hydrates from.
  expect(await page.content()).not.toMatch(emailPattern);

  const link = await revealEmail(page);
  await expect(link).toHaveAttribute("href", /^mailto:/);
  // Focus moves to the email so keyboard users don't lose their place.
  await expect(link).toBeFocused();
});

test("case study opens from the projects page and links back", async ({
  page,
}) => {
  const [first] = caseStudies;
  await page.goto("/projects");
  await page.getByRole("link", { name: first.title }).click();
  await expect(page).toHaveURL(`/projects/${first.slug}`);
  await expect(
    page.getByRole("heading", { level: 1, name: `cat ${first.slug}.md` }),
  ).toBeVisible();

  await page.getByRole("link", { name: site.pages.projects.backLabel }).click();
  await expect(page).toHaveURL("/projects");
});

for (const path of ["/projects/nope", "/no-such-page"]) {
  test(`${path} shows the 404 page with the typed path`, async ({ page }) => {
    const { command, error, homeLabel } = site.pages.notFound;
    const target = path.slice(1);
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle(`Not found | ${profile.name}`);
    await expect(
      page.getByRole("heading", { level: 1, name: `${command} ${target}` }),
    ).toBeVisible();
    await expect(
      page.getByText(`${command}: ${error}: ${target}`),
    ).toBeVisible();

    await page.getByRole("link", { name: homeLabel, exact: true }).click();
    await expect(page).toHaveURL("/");
  });
}
