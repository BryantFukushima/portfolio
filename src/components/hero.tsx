import Link from "next/link";
import { profile, site } from "@/content";

// Home page intro: the "output" of `whoami`.
export function Hero() {
  return (
    <div className="mt-8">
      <p className="text-3xl font-bold sm:text-4xl">{profile.name}</p>
      <p className="mt-2 sm:text-lg">
        <span className="text-teal">{profile.title}</span>
        <span className="text-muted"> · {profile.location}</span>
      </p>
      <p className="mt-6 max-w-[65ch] leading-relaxed sm:text-lg">
        {profile.pitch}
      </p>
      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <li>
          <Link
            href="/resume"
            className="inline-block border border-teal px-4 py-2 text-teal hover:bg-teal hover:text-bg"
          >
            {site.pages.home.resumeLinkLabel} <span aria-hidden="true">→</span>
          </Link>
        </li>
        {profile.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 text-muted hover:text-teal"
            >
              {link.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
