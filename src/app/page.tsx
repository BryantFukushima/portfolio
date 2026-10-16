import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { PromptHeading } from "@/components/prompt-heading";
import { profile, site } from "@/content";
import type { Metadata } from "next";
import type { CSSVars } from "@/lib/css";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  description: site.pages.home.description,
  path: "/",
});

// Structured data (JSON-LD) describing who this site is about, so search engines can connect the
// name with the GitHub and LinkedIn profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: site.url,
  sameAs: profile.links.map((link) => link.href),
};

export default function Home() {
  const { path, command, aboutCommand } = site.pages.home;
  // The reveal waits for `whoami` to finish typing, so it needs the command's length too.
  const style: CSSVars = { "--chars": command.length };

  return (
    <div style={style}>
      <script
        type="application/ld+json"
        // Escaping "<" keeps the JSON from closing the <script> tag early (per the Next.js guide).
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PromptHeading path={path} command={command} />
      <div className="motion-safe:animate-reveal">
        <Hero />
        <About path={path} command={aboutCommand} />
      </div>
    </div>
  );
}
