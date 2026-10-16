"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { PromptLine } from "@/components/prompt-line";
import type { CSSVars } from "@/lib/css";
import { toShellTarget } from "@/lib/urls";

type NotFoundPromptProps = {
  prompt: string;
  path: string;
  command: string;
  fallbackTarget: string;
  error: string;
  // The rest of the page, rendered on the server and revealed after the error line.
  children: ReactNode;
};

const noSubscribe = () => () => {};

// A client component because only the browser knows which URL was typed: the 404 page is one
// static file served for every missing path. The server renders the fallback ("cd not-found"),
// then the browser swaps in the real path right after loading.
export function NotFoundPrompt({
  prompt,
  path,
  command,
  fallbackTarget,
  error,
  children,
}: NotFoundPromptProps) {
  // useSyncExternalStore reads a value from outside React. The third argument is what the server
  // uses (it has no `window`), so the HTML and the first browser render match.
  const pathname = useSyncExternalStore(
    noSubscribe,
    () => window.location.pathname,
    () => null,
  );
  const target = (pathname && toShellTarget(pathname)) || fallbackTarget;
  const line = `${command} ${target}`;
  // The reveal waits for the command to finish typing, so it needs the command's length.
  const style: CSSVars = { "--chars": line.length };

  return (
    <div style={style}>
      {/* `key` restarts the typing animation if the path changes after loading. */}
      <PromptLine key={line} prompt={prompt} path={path} command={line} />
      <div className="motion-safe:animate-reveal">
        <p className="mt-6 break-all text-magenta">
          {command}: {error}: {target}
        </p>
        {children}
      </div>
    </div>
  );
}
