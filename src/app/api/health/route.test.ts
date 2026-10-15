import { describe, expect, it, vi, beforeEach } from "vitest";
import { GET } from "./route";
import { prisma } from "@/server/db";

describe("/api/health", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and connected status when database is reachable", async () => {
    vi.spyOn(prisma, "$queryRaw").mockResolvedValueOnce([{ "?column?": 1 }]);

    const res = await GET();
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.database).toBe("connected");
  });

  it("returns 503 and degraded status when database fails", async () => {
    vi.spyOn(prisma, "$queryRaw").mockRejectedValueOnce(new Error("DB Connection Error"));

    const res = await GET();
    expect(res.status).toBe(503);

    const data = await res.json();
    expect(data.status).toBe("degraded");
    expect(data.database).toBe("disconnected");
  });
});
