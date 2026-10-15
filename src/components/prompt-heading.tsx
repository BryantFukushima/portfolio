import type { CSSProperties } from "react";
import { Cursor } from "@/components/cursor";
import { Logo } from "@/components/logo";
import { site } from "@/content";

type PromptHeadingProps = {
  path: string;
  command: string;
};

// React's CSSProperties doesn't know about CSS custom properties, so allow any `--name` key too.
type CSSVars = CSSProperties & Record<`--${string}`, number>;

// Page heading styled as a shell line, e.g. "bryant@fukushima:~/resume [logo] cat resume.md".
// The prompt is static; only the command types itself out. The full text is always in the HTML;
// CSS only reveals the command one character (1ch) at a time.
// Each half is nowrap, so on narrow screens the line breaks between the prompt and the logo.
export function PromptHeading({ path, command }: PromptHeadingProps) {
  const style: CSSVars = { "--chars": command.length };

  return (
    <h1 style={style} className="text-xl font-bold sm:text-2xl">
      {/* Hidden from screen readers so the heading reads as just the command. */}
      <span aria-hidden="true" className="whitespace-nowrap">
        <span className="text-teal">{site.prompt}</span>
        <span className="text-muted">:{path}</span>
      </span>
      {/* No space before the logo, but still a place to wrap on narrow screens. */}
      <wbr />
      <span className="whitespace-nowrap">
        <Logo className="mr-3 ml-1 text-magenta" />
        <span className="inline-block w-[calc(var(--chars)*1ch)] overflow-hidden align-bottom whitespace-nowrap motion-safe:animate-type">
          {command}
        </span>
        <Cursor />
      </span>
    </h1>
  );
}
