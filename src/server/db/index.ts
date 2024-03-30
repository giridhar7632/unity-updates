import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// @ts-expect-error dotenv
export const db = drizzle(postgres(process.env.SUPABASE_URL), { schema });