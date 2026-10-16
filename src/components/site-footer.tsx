import { ExternalLink } from "@/components/external-link";
import { profile, site } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-sm text-muted">
        <p>
          © {site.copyrightYear} {profile.name}
        </p>
        <ul className="flex gap-5">
          {profile.links.map((link) => (
            <li key={link.href}>
              <ExternalLink
                href={link.href}
                arrow={false}
                className="inline-block py-2 hover:text-teal"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
