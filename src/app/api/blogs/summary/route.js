import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { blogTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const revalidate = 60; // ISR for 60s

export async function GET() {
  try {
    const blogs = await db
      .select({
        id: blogTable.id,
        title: blogTable.title,
        category: blogTable.category,
        image: blogTable.image,
        createdAt: blogTable.createdAt,
      })
      .from(blogTable)
      .orderBy(desc(blogTable.createdAt));

    return NextResponse.json(blogs, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching blog summaries:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
