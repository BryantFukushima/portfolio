"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { type EmailResult, getEmail } from "@/app/contact/actions";

type EmailRevealProps = {
  revealLabel: string;
  loadingLabel: string;
  errorMessage: string;
};

// A client component because it needs a click handler and state. The email isn't in the page
// until the button is clicked; then it's fetched from the server and replaces the button.
export function EmailReveal({
  revealLabel,
  loadingLabel,
  errorMessage,
}: EmailRevealProps) {
  // `null` means "not asked yet". `EmailResult | null` allows either type.
  const [result, setResult] = useState<EmailResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const linkRef = useRef<HTMLAnchorElement>(null);

  // The button disappears once the email shows, so move focus to the link that replaces it.
  useEffect(() => {
    if (result?.ok) linkRef.current?.focus();
  }, [result]);

  function reveal() {
    startTransition(async () => {
      const next = await getEmail();
      // State updates after an `await` need their own startTransition to stay in the transition.
      startTransition(() => setResult(next));
    });
  }

  if (result?.ok) {
    return (
      <a
        ref={linkRef}
        href={`mailto:${result.email}`}
        className="text-teal underline-offset-4 hover:underline"
      >
        {result.email}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={reveal}
        disabled={isPending}
        className="border border-teal px-3 text-teal hover:bg-teal hover:text-bg disabled:opacity-60"
      >
        {isPending ? loadingLabel : revealLabel}
      </button>
      {/* aria-live announces the error to screen readers when it appears. */}
      <p aria-live="polite" className="mt-2 text-sm text-muted">
        {result && !result.ok ? errorMessage : null}
      </p>
    </>
  );
}
