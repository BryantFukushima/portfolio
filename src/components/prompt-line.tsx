import { Cursor } from "@/components/cursor";
import { Logo } from "@/components/logo";
import type { CSSVars } from "@/lib/css";

export type PromptLineProps = {
  // The shell prompt before the path, e.g. "bryant@fukushima".
  prompt: string;
  path: string;
  command: string;
  // 1 = page title (h1, types itself out). 2 = section title (h2, smaller and static).
  level?: 1 | 2;
};

// Heading styled as a shell line, e.g. "bryant@fukushima:~/resume [logo] cat resume.md".
// The prompt is static; on page titles the command types itself out. The full text is always in
// the HTML; CSS only reveals the command one character (1ch) at a time.
// Each half is nowrap, so on narrow screens the line breaks between the prompt and the logo.
// Presentational only (no content imports), so client components can use it too.
export function PromptLine({
  prompt,
  path,
  command,
  level = 1,
}: PromptLineProps) {
  const style: CSSVars = { "--chars": command.length };
  const isTitle = level === 1;
  const Tag = isTitle ? "h1" : "h2";

  return (
    <Tag
      style={style}
      className={`font-bold ${isTitle ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}
    >
      {/* Hidden from screen readers so the heading reads as just the command. */}
      <span aria-hidden="true" className="whitespace-nowrap">
        <span className="text-teal">{prompt}</span>
        <span className="text-muted">:{path}</span>
      </span>
      {/* No space before the logo, but still a place to wrap on narrow screens. */}
      <wbr />
      <span className="whitespace-nowrap">
        <Logo className="mr-3 ml-1 text-magenta" />
        {isTitle ? (
          <>
            <span className="inline-block w-[calc(var(--chars)*1ch)] overflow-hidden align-bottom whitespace-nowrap motion-safe:animate-type">
              {command}
            </span>
            <Cursor />
          </>
        ) : (
          command
        )}
      </span>
    </Tag>
  );
}
