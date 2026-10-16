import { profile, site } from "@/content";
import { ogSize } from "@/lib/metadata";
import { renderOgImage } from "@/lib/og-image";

// The link-preview image for every page that doesn't have its own (Next.js finds this file by name).
export const alt = `${profile.name}, ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: site.pages.home.path,
    command: site.pages.home.command,
    heading: profile.name,
    subheading: profile.title,
  });
}
