import { NextResponse } from "next/server";
import { blogService } from "@/services/blogService";
import { authService } from "@/services/authService";
import { handleApiError } from "@/lib/errors";

export const revalidate = 60; // cache for 60s (ISR-like)

/**
 * GET /api/blogs
 * Fetch all blogs
 */
export async function GET(request) {
  try {
    const blogs = await blogService.getAllBlogs();
    return NextResponse.json(blogs, {
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
 * POST /api/blogs
 * Create a new blog (requires authentication)
 */
export async function POST(request) {
  try {
    // Check authentication
    if (!authService.isAuthenticated(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Please login as admin." },
        { status: 401 },
      );
    }

    const blogData = await request.json();
    const blog = await blogService.createBlog(blogData);

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
