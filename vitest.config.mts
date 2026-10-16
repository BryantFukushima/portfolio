import path from "node:path";
import { defineConfig } from "vitest/config";

// Unit tests for content rules and helpers. They run in Node (no browser): UI is covered by the
// Playwright tests in e2e/. `defineConfig` only adds types, so the editor can autocomplete options.
export default defineConfig({
  resolve: {
    // Same `@/` alias as tsconfig.json.
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
