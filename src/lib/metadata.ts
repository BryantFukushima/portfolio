import type { Metadata } from "next";
import { profile } from "@/content";

// Link-preview images are 1200×630, the size LinkedIn, Slack and X expect.
export const ogSize = { width: 1200, height: 630 };

type PreviewImage = {
  // Path of an opengraph-image route, e.g. "/projects/ecs-migration/opengraph-image".
  url: string;
  alt: string;
};

type PageMetadataInput = {
  // Page name for the browser tab; the layout's template adds " | Bryant Fukushima".
  title?: string;
  description: string;
  // Path on this site, e.g. "/resume". The layout's metadataBase turns it into a full URL.
  path: string;
  // Defaults to the site-wide card from src/app/opengraph-image.tsx.
  image?: PreviewImage;
};

const defaultImage: PreviewImage = {
  url: "/opengraph-image",
  alt: `${profile.name}, ${profile.title}`,
};

// Title, description, canonical link and link-preview (Open Graph) tags for one page.
// A page's `openGraph` replaces the layout's instead of merging with it, so every field is set
// here, including the preview image (an explicit image also replaces a file-based one).
export function pageMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${profile.name}` : profile.name;
  const images = [{ ...image, ...ogSize }];

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
