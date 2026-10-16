import type { MetadataRoute } from "next";
import { site } from "@/content";

// Served at /robots.txt: lets search engines crawl everything and points them to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
