import { describe, expect, it } from "vitest";
import { env } from "./env";

describe("env configuration", () => {
  it("provides valid env configuration in test environment", () => {
    expect(env.DATABASE_URL).toBeDefined();
    expect(env.AUTH_SECRET).toBeDefined();
    expect(env.CRON_SECRET).toBeDefined();
    expect(typeof env.AI_ENABLED).toBe("boolean");
  });
});
