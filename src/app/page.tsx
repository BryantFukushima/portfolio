import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { PromptHeading } from "@/components/prompt-heading";
import { site } from "@/content";
import type { CSSVars } from "@/lib/css";

export default function Home() {
  const { path, command, aboutCommand } = site.pages.home;
  // The reveal waits for `whoami` to finish typing, so it needs the command's length too.
  const style: CSSVars = { "--chars": command.length };

  return (
    <div style={style}>
      <PromptHeading path={path} command={command} />
      <div className="motion-safe:animate-reveal">
        <Hero />
        <About path={path} command={aboutCommand} />
      </div>
    </div>
  );
}
