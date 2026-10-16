import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { caseStudies, site } from "@/content";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists every nav page and case study as a full URL", () => {
    expect(urls).toContain(site.url);
    expect(urls).toContain(`${site.url}/resume`);
    for (const { slug } of caseStudies) {
      expect(urls).toContain(`${site.url}/projects/${slug}`);
    }
  });

  it("has no duplicates", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("robots", () => {
  it("allows crawling and points to the sitemap", () => {
    const { rules, sitemap: sitemapUrl } = robots();
    expect(rules).toEqual({ userAgent: "*", allow: "/" });
    expect(sitemapUrl).toBe(`${site.url}/sitemap.xml`);
  });
});
