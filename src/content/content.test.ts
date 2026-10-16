import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
// Importing this runs every content file through its schema, so a bad entry fails right here.
import { caseStudies, site } from "@/content";

const root = path.resolve(import.meta.dirname, "../..");
const contentDir = path.join(root, "src/content");

describe("site content", () => {
  it("has an MDX file for every case study", () => {
    for (const { slug } of caseStudies) {
      expect(
        existsSync(path.join(contentDir, "projects", `${slug}.mdx`)),
        `missing src/content/projects/${slug}.mdx`,
      ).toBe(true);
    }
  });

  it("links to a resume PDF that exists in public/", () => {
    const { href } = site.pages.resume.download;
    expect(existsSync(path.join(root, "public", href))).toBe(true);
  });

  // The repo is public: the email lives in the CONTACT_EMAIL env var, and the phone number stays
  // off the site entirely. These generic patterns catch either one being pasted into content.
  it("contains no email addresses or phone numbers", () => {
    const email = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i;
    const phone = /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}/;
    const files = readdirSync(contentDir, { recursive: true, encoding: "utf8" })
      .filter((file) => /\.(ts|mdx)$/.test(file) && !file.endsWith(".test.ts"))
      .map((file) => path.join(contentDir, file));

    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      expect(text, `email in ${file}`).not.toMatch(email);
      expect(text, `phone number in ${file}`).not.toMatch(phone);
    }
  });
});
