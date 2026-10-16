import type { ReactNode } from "react";
import { MarkdownHeading } from "@/components/markdown-heading";

type ResumeSectionProps = {
  heading: string;
  // ReactNode is anything React can render: elements, text, lists, or nothing.
  children: ReactNode;
};

// A resume section with a Markdown-style heading ("## Experience"), since the page is the output
// of `cat resume.md`.
export function ResumeSection({ heading, children }: ResumeSectionProps) {
  return (
    <section className="mt-12">
      <MarkdownHeading>{heading}</MarkdownHeading>
      <div className="mt-4">{children}</div>
    </section>
  );
}
