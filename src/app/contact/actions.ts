"use server";

import { z } from "zod";

// Either the email, or a failure with nothing else. Checking `ok` tells TypeScript which one it
// is, so `email` can only be read after confirming `ok` is true (a "discriminated union").
export type EmailResult = { ok: true; email: string } | { ok: false };

// Runs only on the server; the browser gets a reference that POSTs here when the button is
// clicked. That keeps the email out of the HTML, the JavaScript bundle, and the public repo.
// Anyone can call this directly, which is fine: it takes no input and returns only the email.
export async function getEmail(): Promise<EmailResult> {
  // Env vars are `string | undefined`, since nothing guarantees they're set. Zod checks both.
  const result = z.email().safeParse(process.env.CONTACT_EMAIL);
  if (!result.success) {
    console.error("CONTACT_EMAIL is missing or not a valid email address.");
    return { ok: false };
  }
  return { ok: true, email: result.data };
}
