import { describe, expect, it } from "vitest";
import { displayUrl, toShellTarget } from "@/lib/urls";

describe("displayUrl", () => {
  it("drops the protocol and www", () => {
    expect(displayUrl("https://www.linkedin.com/in/bryant-fukushima")).toBe(
      "linkedin.com/in/bryant-fukushima",
    );
    expect(displayUrl("https://github.com/BryantFukushima")).toBe(
      "github.com/BryantFukushima",
    );
  });

  it("leaves a URL without a protocol alone", () => {
    expect(displayUrl("example.com/path")).toBe("example.com/path");
  });
});

describe("toShellTarget", () => {
  it("drops the leading and trailing slashes", () => {
    expect(toShellTarget("/projects/zzz/")).toBe("projects/zzz");
  });

  it("decodes escaped characters, and keeps malformed ones as typed", () => {
    expect(toShellTarget("/my%20page")).toBe("my page");
    expect(toShellTarget("/bad%E0")).toBe("bad%E0");
  });

  it("shortens long paths to 20 characters", () => {
    const target = toShellTarget("/projects/a-very-long-project-name");
    expect(target).toHaveLength(20);
    expect(target.endsWith("…")).toBe(true);
  });
});
