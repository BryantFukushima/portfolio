"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

// Client component: usePathname() reads the current URL, which only the browser knows as you navigate.
export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      // py-2 gives each link a tap target well over WCAG's 24px minimum.
      className={`inline-block py-2 ${
        isActive
          ? "text-teal underline underline-offset-4"
          : "text-muted hover:text-teal"
      }`}
    >
      {children}
    </Link>
  );
}
