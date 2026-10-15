import Link from "next/link";
import { Logo } from "@/components/logo";
import { NavLink } from "@/components/nav-link";
import { profile, site } from "@/content";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="font-bold"
        >
          <span className="text-teal">{site.prompt}</span>
          <span className="text-muted">:~</span>
          <Logo className="ml-2 text-magenta" />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-base sm:text-lg">
            {site.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
