import { type Config } from "drizzle-kit";

export default {
  out: "./src/server/db/drizzle",
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.SUPABASE_URL as string,
  },
} satisfies Config;