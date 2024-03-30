// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
  text,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const reports = pgTable(
  "reports",
  {
    id: serial("id").primaryKey(),
    lat: numeric("lat").notNull(),
    lon: numeric("lon").notNull(),
    name: varchar("name", { length: 256 }),
    number: text("number").notNull(),
    category: text("category").notNull(),
    description: text("description"),
    upvotes: integer("upvotes").default(0),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.createdAt),
  }),
);
