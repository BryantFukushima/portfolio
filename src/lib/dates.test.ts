import { describe, expect, it } from "vitest";
import { formatYearMonth } from "@/lib/dates";

describe("formatYearMonth", () => {
  it("formats YYYY-MM as a short month and year", () => {
    expect(formatYearMonth("2023-06")).toBe("Jun 2023");
  });

  it("handles the first and last month", () => {
    expect(formatYearMonth("2019-01")).toBe("Jan 2019");
    expect(formatYearMonth("2022-12")).toBe("Dec 2022");
  });
});
