import { describe, expect, it } from "vitest";
import { formatNumber, formatRupiah } from "./format";

describe("formatRupiah", () => {
  it("formats standard integer rupiah correctly", () => {
    const formatted = formatRupiah(12500);
    expect(formatted).toContain("12.500");
    expect(formatted).toContain("Rp");
  });

  it("formats zero rupiah", () => {
    const formatted = formatRupiah(0);
    expect(formatted).toContain("0");
    expect(formatted).toContain("Rp");
  });

  it("formats large numbers with dots as thousands separator", () => {
    const formatted = formatRupiah(1500000);
    expect(formatted).toContain("1.500.000");
  });
});

describe("formatNumber", () => {
  it("formats number with Indonesian thousand separator", () => {
    expect(formatNumber(1000)).toBe("1.000");
  });

  it("formats decimals correctly", () => {
    expect(formatNumber(10.5, 1)).toBe("10,5");
  });
});
