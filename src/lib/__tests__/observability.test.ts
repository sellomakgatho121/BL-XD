import { describe, it, expect } from "vitest";
import { logger, measure } from "@/lib/observability";

describe("logger", () => {
  it("logs debug messages to history", () => {
    logger.debug("debug message", { key: "value" });
    const entry = logger.getHistory().at(-1);
    expect(entry).toBeDefined();
    expect(entry!.level).toBe("debug");
    expect(entry!.message).toBe("debug message");
  });

  it("logs info messages to history", () => {
    logger.info("info message");
    const entry = logger.getHistory().at(-1);
    expect(entry).toBeDefined();
    expect(entry!.level).toBe("info");
    expect(entry!.message).toBe("info message");
  });

  it("logs warn messages to history", () => {
    logger.warn("warn message", { severity: "medium" });
    const entry = logger.getHistory().at(-1);
    expect(entry).toBeDefined();
    expect(entry!.level).toBe("warn");
    expect(entry!.message).toBe("warn message");
  });

  it("logs error messages to history", () => {
    const err = new Error("test");
    logger.error("error message", err);
    const entry = logger.getHistory().at(-1);
    expect(entry).toBeDefined();
    expect(entry!.level).toBe("error");
    expect(entry!.message).toBe("error message");
  });

  it("includes timestamps in log entries", () => {
    logger.info("timed entry");
    const entry = logger.getHistory().at(-1);
    expect(entry).toBeDefined();
    expect(entry!.timestamp).toBeDefined();
    expect(() => new Date(entry!.timestamp)).not.toThrow();
  });
});

describe("measure", () => {
  it("measures sync function execution", async () => {
    const result = await measure("sync-test", () => 42);
    expect(result).toBe(42);
  });

  it("measures async function execution", async () => {
    const result = await measure("async-test", async () => {
      await new Promise((r) => setTimeout(r, 5));
      return "done";
    });
    expect(result).toBe("done");
  });

  it("propagates function errors", async () => {
    await expect(
      measure("error-test", () => {
        throw new Error("measure error");
      })
    ).rejects.toThrow("measure error");
  });
});
