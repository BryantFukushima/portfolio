import type { Metadata } from "next";
import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const { path, command, placeholder } = site.pages.projects;

  return (
    <section>
      <PromptHeading path={path} command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
