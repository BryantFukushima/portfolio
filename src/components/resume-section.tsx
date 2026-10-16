import type { ReactNode } from "react";

type ResumeSectionProps = {
  heading: string;
  // ReactNode is anything React can render: elements, text, lists, or nothing.
  children: ReactNode;
};

// A resume section with a Markdown-style heading ("## Experience"), since the page is the output
// of `cat resume.md`. The "##" is decoration, so screen readers only hear the heading text.
export function ResumeSection({ heading, children }: ResumeSectionProps) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold sm:text-xl">
        <span aria-hidden="true" className="text-magenta">
          ##{" "}
        </span>
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
