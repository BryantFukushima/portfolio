import { PromptHeading } from "@/components/prompt-heading";
import { profile } from "@/content";

type AboutProps = {
  path: string;
  command: string;
};

export function About({ path, command }: AboutProps) {
  return (
    <section className="mt-16">
      <PromptHeading level={2} path={path} command={command} />
      <div className="mt-4 max-w-[65ch] space-y-4 leading-relaxed">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
