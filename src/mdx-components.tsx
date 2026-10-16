import type { MDXComponents } from "mdx/types";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { MarkdownHeading } from "@/components/markdown-heading";

// Required by @next/mdx: maps Markdown elements to styled components for every .mdx file.
// `MDXComponents` types each key, so e.g. `a` receives the same props as a normal <a>.
const components: MDXComponents = {
  h2: ({ children }) => (
    <div className="mt-12 mb-4">
      <MarkdownHeading>{children}</MarkdownHeading>
    </div>
  ),
  h3: ({ children }) => (
    <div className="mt-8 mb-3">
      <MarkdownHeading level={3}>{children}</MarkdownHeading>
    </div>
  ),
  p: ({ children }) => (
    <p className="my-4 max-w-[65ch] leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 max-w-[65ch] space-y-2 leading-relaxed">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-magenta">
        -
      </span>
      <span>{children}</span>
    </li>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-teal underline underline-offset-4">
      {children}
    </a>
  ),
  em: ({ children }) => <em className="text-muted">{children}</em>,
  code: ({ children }) => (
    <code className="bg-surface px-1 text-yellow">{children}</code>
  ),
  // Available in every .mdx file without an import.
  ArchitectureDiagram,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
