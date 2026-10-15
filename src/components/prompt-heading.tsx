import type { CSSProperties } from "react";
import { Cursor } from "@/components/cursor";
import { Logo } from "@/components/logo";

type PromptHeadingProps = {
  command: string;
};

// React's CSSProperties doesn't know about CSS custom properties, so allow any `--name` key too.
type CSSVars = CSSProperties & Record<`--${string}`, number>;

// Page heading styled as a shell command, e.g. "$ whoami", that types itself out.
// The full text is always in the HTML; CSS only reveals it one character (1ch) at a time.
export function PromptHeading({ command }: PromptHeadingProps) {
  const style: CSSVars = { "--chars": command.length };

  return (
    <h1 style={style} className="text-2xl font-bold sm:text-3xl">
      <Logo className="mr-3 text-magenta" />
      <span className="inline-block w-[calc(var(--chars)*1ch)] overflow-hidden align-bottom whitespace-nowrap motion-safe:animate-type">
        {command}
      </span>
      <Cursor />
    </h1>
  );
}
