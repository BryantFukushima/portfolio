import type { Metadata } from "next";
import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const { command, placeholder } = site.pages.contact;

  return (
    <section>
      <PromptHeading command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
