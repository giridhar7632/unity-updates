"use server";

import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function addReport(values) {
  await db.insert(posts).values(values);
  revalidatePath("/report");
}

export async function getReports() {
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}
