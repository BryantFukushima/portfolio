import type { Metadata } from "next";
import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  const { command, placeholder } = site.pages.resume;

  return (
    <section>
      <PromptHeading command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
