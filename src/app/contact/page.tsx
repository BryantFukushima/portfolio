import type { Metadata } from "next";
import { EmailReveal } from "@/components/email-reveal";
import { PromptHeading } from "@/components/prompt-heading";
import { profile, site } from "@/content";
import type { CSSVars } from "@/lib/css";

export const metadata: Metadata = {
  title: "Contact",
};

// "https://www.linkedin.com/in/x" → "linkedin.com/in/x", like the resume's contact line.
function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "");
}

export default function ContactPage() {
  const { path, command, emailLabel, revealLabel, loadingLabel, errorMessage } =
    site.pages.contact;
  // The reveal waits for the title's command to finish typing, so it needs the command's length.
  const style: CSSVars = { "--chars": command.length };

  return (
    <div style={style}>
      <PromptHeading path={path} command={command} />
      <dl className="mt-8 space-y-4 motion-safe:animate-reveal">
        <div className="sm:flex sm:gap-4">
          <dt className="shrink-0 text-muted sm:w-24">{emailLabel}</dt>
          <dd>
            <EmailReveal
              revealLabel={revealLabel}
              loadingLabel={loadingLabel}
              errorMessage={errorMessage}
            />
          </dd>
        </div>
        {profile.links.map((link) => (
          <div key={link.href} className="sm:flex sm:gap-4">
            <dt className="shrink-0 text-muted sm:w-24">{link.label}</dt>
            <dd>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-teal underline-offset-4 hover:underline"
              >
                {displayUrl(link.href)} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
