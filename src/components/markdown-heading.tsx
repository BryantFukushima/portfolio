import type { ReactNode } from "react";

type MarkdownHeadingProps = {
  // 2 = "## Heading" (h2), 3 = "### Heading" (h3).
  level?: 2 | 3;
  children: ReactNode;
};

// A heading styled like Markdown source, since pages read like `cat file.md` output.
// The "##" is decoration, so screen readers only hear the heading text.
export function MarkdownHeading({ level = 2, children }: MarkdownHeadingProps) {
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag
      className={`font-bold ${level === 2 ? "text-lg sm:text-xl" : "sm:text-lg"}`}
    >
      <span aria-hidden="true" className="text-magenta">
        {"#".repeat(level)}{" "}
      </span>
      {children}
    </Tag>
  );
}
