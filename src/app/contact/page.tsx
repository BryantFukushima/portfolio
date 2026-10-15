import type { Metadata } from "next";
import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const { path, command, placeholder } = site.pages.contact;

  return (
    <section>
      <PromptHeading path={path} command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
