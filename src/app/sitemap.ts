import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/content";

// Served at /sitemap.xml: every page search engines should find, including each case study.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...site.nav.map((link) => link.href),
    ...caseStudies.map((project) => `/projects/${project.slug}`),
  ];
  return paths.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
  }));
}
