"use server";

import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { reports } from "~/server/db/schema";

export async function addReport(values) {
  await db.insert(reports).values(values);
  revalidatePath("/report");
}

export async function getReports() {
  return db.select().from(reports).orderBy(desc(reports.createdAt));
}

export async function upvoteReport(id) {
  await db
    .update(reports)
    .set({ upvotes: sql`${reports.upvotes} + 1` })
    .where(eq(reports.id, id));
  revalidatePath("/report");
}

export async function rmUpvote(id) {
  await db
    .update(reports)
    .set({ upvotes: sql`${reports.upvotes} - 1` })
    .where(eq(reports.id, id));
  revalidatePath("/report");
}
