import { PromptLine, type PromptLineProps } from "@/components/prompt-line";
import { site } from "@/content";

// `Omit<PromptLineProps, "prompt">` is every PromptLine prop except `prompt`, which comes from
// site content here, so pages only pass the path and command.
type PromptHeadingProps = Omit<PromptLineProps, "prompt">;

export function PromptHeading(props: PromptHeadingProps) {
  return <PromptLine prompt={site.prompt} {...props} />;
}
