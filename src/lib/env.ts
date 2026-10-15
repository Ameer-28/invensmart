import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL wajib diisi"),
  DIRECT_URL: z.string().optional(),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET wajib diisi"),
  CRON_SECRET: z.string().min(1, "CRON_SECRET wajib diisi"),
  AI_ENABLED: z
    .string()
    .optional()
    .default("true")
    .transform((val) => val === "true"),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().optional().default("gemini-2.5-flash"),
  APP_URL: z.string().url().optional().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const useFallback =
      process.env.NEXT_PHASE === "phase-production-build" ||
      process.env.NODE_ENV === "test";

    // Fallback hanya aktif untuk fase build statis dan automated test environment
    if (useFallback) {
      return {
        DATABASE_URL:
          process.env.DATABASE_URL ||
          "postgresql://postgres:postgres@localhost:5432/invensmart",
        DIRECT_URL:
          process.env.DIRECT_URL ||
          process.env.DATABASE_URL ||
          "postgresql://postgres:postgres@localhost:5432/invensmart",
        AUTH_SECRET:
          process.env.AUTH_SECRET ||
          "build-dummy-auth-secret-min-32-chars-long",
        CRON_SECRET: process.env.CRON_SECRET || "build-dummy-cron-secret",
        AI_ENABLED: process.env.AI_ENABLED !== "false",
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
        GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        APP_URL: process.env.APP_URL || "http://localhost:3000",
        NODE_ENV:
          (process.env.NODE_ENV as "development" | "test" | "production") ||
          "development",
      };
    }

    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");

    throw new Error(`[CRITICAL] Invalid environment variables: ${issues}`);
  }

  return result.data;
}

export const env = parseEnv();
