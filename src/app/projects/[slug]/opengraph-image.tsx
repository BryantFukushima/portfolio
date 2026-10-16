import { notFound } from "next/navigation";
import { caseStudies, findCaseStudy, profile, site } from "@/content";
import { ogSize } from "@/lib/metadata";
import { renderOgImage } from "@/lib/og-image";

// Each case study gets its own link-preview image, built at build time.
export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findCaseStudy(slug);
  if (!project) notFound();

  return renderOgImage({
    path: `${site.pages.projects.path}/${slug}`,
    command: `cat ${slug}.md`,
    heading: project.title,
    subheading: `Case study · ${profile.name}`,
  });
}
