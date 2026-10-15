// Block cursor for PromptHeading: blinks a few times after the command finishes typing, then hides.
// Reads --chars from its parent heading to know when typing ends. Hidden entirely with reduced motion.
export function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-yellow opacity-0 motion-safe:animate-blink-out motion-reduce:hidden"
    />
  );
}
