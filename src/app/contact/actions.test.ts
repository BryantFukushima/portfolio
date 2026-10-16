import { afterEach, describe, expect, it, vi } from "vitest";
import { getEmail } from "@/app/contact/actions";

describe("getEmail", () => {
  // vi.stubEnv changes process.env for one test; this puts the real values back afterwards.
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the email when CONTACT_EMAIL is set", async () => {
    vi.stubEnv("CONTACT_EMAIL", "test@example.com");
    expect(await getEmail()).toEqual({ ok: true, email: "test@example.com" });
  });

  it("fails without leaking anything when CONTACT_EMAIL is missing or invalid", async () => {
    // The action logs the problem on the server; silence it so test output stays clean.
    vi.spyOn(console, "error").mockImplementation(() => {});
    for (const value of [undefined, "", "not-an-email"]) {
      vi.stubEnv("CONTACT_EMAIL", value);
      expect(await getEmail()).toEqual({ ok: false });
    }
  });
});
