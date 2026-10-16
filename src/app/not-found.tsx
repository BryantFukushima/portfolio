import type { Metadata } from "next";
import Link from "next/link";
import { NotFoundPrompt } from "@/components/not-found-prompt";
import { site } from "@/content";

export const metadata: Metadata = {
  title: site.pages.notFound.title,
};

// Shown for every 404: unknown URLs, unknown project slugs (via src/proxy.ts) and notFound().
export default function NotFound() {
  const { path, command, fallbackTarget, error, message, homeLabel, homeHint } =
    site.pages.notFound;

  return (
    <NotFoundPrompt
      prompt={site.prompt}
      path={path}
      command={command}
      fallbackTarget={fallbackTarget}
      error={error}
    >
      <p className="mt-2 text-muted">{message}</p>
      <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Link
          href="/"
          className="inline-block border border-teal px-4 py-2 text-teal hover:bg-teal hover:text-bg"
        >
          {homeLabel}
        </Link>
        <span className="text-muted">{homeHint}</span>
      </p>
    </NotFoundPrompt>
  );
}
