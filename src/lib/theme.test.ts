import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { colors } from "@/lib/theme";

describe("colors", () => {
  it("matches the theme tokens in globals.css", () => {
    const css = readFileSync(
      path.resolve(import.meta.dirname, "../app/globals.css"),
      "utf8",
    );
    // `Object.entries` turns { bg: "#1a0f29", … } into [["bg", "#1a0f29"], …].
    for (const [name, hex] of Object.entries(colors)) {
      expect(css, `--color-${name}`).toContain(`--color-${name}: ${hex};`);
    }
  });
});
