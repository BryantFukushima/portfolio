import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content";

export default function Home() {
  const { path, command, placeholder } = site.pages.home;

  return (
    <section>
      <PromptHeading path={path} command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
