import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  className?: string;
  // Show the ↗ arrow after the text (decorative, hidden from screen readers).
  arrow?: boolean;
  children: ReactNode;
};

// A link to another site, opened in a new tab. Screen readers hear "(opens in a new tab)" so the
// new tab isn't a surprise; `noopener noreferrer` stops the other site from controlling this one.
export function ExternalLink({
  href,
  className,
  arrow = true,
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      {arrow && <span aria-hidden="true"> ↗</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
