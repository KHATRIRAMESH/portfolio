import { NextResponse } from "next/server";

/**
 * GET /api/blogs/[id]/content
 * Returns TipTap JSON content for the blog
 */
export async function GET() {
  return new NextResponse(
    JSON.stringify({
      error: "Deprecated: content stored in DB. Use /api/blogs/[id]",
    }),
    { status: 410, headers: { "Content-Type": "application/json" } },
  );
}

/**
 * PUT /api/blogs/[id]/content
 * Saves TipTap JSON content externally
 */
export async function PUT() {
  return new NextResponse(
    JSON.stringify({
      error: "Deprecated: content stored in DB. Use /api/blogs/[id]",
    }),
    { status: 410, headers: { "Content-Type": "application/json" } },
  );
}
