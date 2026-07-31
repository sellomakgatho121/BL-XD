import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("accepts arrays", () => {
    expect(cn(["a", "b"])).toBe("a b");
  });

  it("accepts objects", () => {
    expect(cn({ "is-active": true, hidden: false })).toBe("is-active");
  });

  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });
});
