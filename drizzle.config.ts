import { type Config } from "drizzle-kit";

import { env } from "~/env.js";

export default {
  out: "./src/server/db/drizzle",
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["unity-updates_*"],
} satisfies Config;
