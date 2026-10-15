import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";
import { prisma } from "@/server/db";
import { env } from "@/lib/env";

describe("/api/cron/daily", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when authorization header is missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/cron/daily");
    const res = await GET(req);
    expect(res.status).toBe(401);

    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it("returns 401 when authorization header is incorrect", async () => {
    const req = new NextRequest("http://localhost:3000/api/cron/daily", {
      headers: {
        authorization: "Bearer wrong-token",
      },
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("executes successfully with valid CRON_SECRET", async () => {
    vi.spyOn(prisma, "$queryRaw").mockResolvedValueOnce([{ "?column?": 1 }]);

    const req = new NextRequest("http://localhost:3000/api/cron/daily", {
      headers: {
        authorization: `Bearer ${env.CRON_SECRET}`,
      },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.summary.keepAlive).toBe(true);
  });
});
