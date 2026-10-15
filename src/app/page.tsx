import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content/site";

export default function Home() {
  const { command, placeholder } = site.pages.home;

  return (
    <section>
      <PromptHeading command={command} />
      <p className="mt-4 text-muted">{placeholder}</p>
    </section>
  );
}
