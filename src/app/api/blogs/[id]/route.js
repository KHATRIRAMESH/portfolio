import { NextResponse } from "next/server";
import { blogService } from "@/services/blogService";
import { authService } from "@/services/authService";
import { handleApiError } from "@/lib/errors";

export const revalidate = 60;

/**
 * GET /api/blogs/[id]
 * Fetch a single blog by ID
 */
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const blog = await blogService.getBlogById(resolvedParams.id);
    return NextResponse.json(blog, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

/**
 * PUT /api/blogs/[id]
 * Update a blog by ID (requires authentication)
 */
export async function PUT(request, { params }) {
  try {
    // Check authentication
    if (!authService.isAuthenticated(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Please login as admin." },
        { status: 401 },
      );
    }

    const resolvedParams = await params;
    const blogData = await request.json();
    const blog = await blogService.updateBlog(resolvedParams.id, blogData);

    return NextResponse.json(blog);
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

/**
 * DELETE /api/blogs/[id]
 * Delete a blog by ID (requires authentication)
 */
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    if (!authService.isAuthenticated(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Please login as admin." },
        { status: 401 },
      );
    }

    const resolvedParams = await params;
    await blogService.deleteBlog(resolvedParams.id);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
