import type { Metadata } from "next";
import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  const { path, command, placeholder } = site.pages.resume;

  return (
    <section>
      <PromptHeading path={path} command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
