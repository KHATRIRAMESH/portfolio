/**
 * Blog Service
 * Business logic layer for blog operations
 */

import { blogRepository } from "@/repositories/blogRepository";
import { validateBlogData, validateBlogMeta } from "@/lib/validators";
import { ValidationError } from "@/lib/errors";
import { cloudinaryService } from "./cloudinaryService";

export class BlogService {
  /**
   * Get all blogs
   */
  async getAllBlogs() {
    return await blogRepository.findAll();
  }

  /**
   * Get a single blog by ID
   */
  async getBlogById(id) {
    const blogId = parseInt(id, 10);
    if (isNaN(blogId)) {
      throw new ValidationError("Invalid blog ID");
    }
    return await blogRepository.findById(blogId);
  }

  /**
   * Create a new blog
   */
  async createBlog(blogData) {
    // Validate full data including content (stored in DB)
    const validatedData = validateBlogData(blogData);

    // Create the blog
    const blog = await blogRepository.create(validatedData);

    return blog;
  }

  /**
   * Update a blog
   */
  async updateBlog(id, blogData) {
    const blogId = parseInt(id, 10);
    if (isNaN(blogId)) {
      throw new ValidationError("Invalid blog ID");
    }

    // Validate full data including content (stored in DB)
    const validatedData = validateBlogData(blogData);

    // Update the blog
    const blog = await blogRepository.update(blogId, validatedData);

    return blog;
  }

  /**
   * Delete a blog
   */
  async deleteBlog(id) {
    const blogId = parseInt(id, 10);
    if (isNaN(blogId)) {
      throw new ValidationError("Invalid blog ID");
    }

    // Delete from DB and get deleted row (contains image URL)
    const deleted = await blogRepository.delete(blogId);

    // Best-effort Cloudinary cleanup
    try {
      if (deleted?.image) {
        const publicId = cloudinaryService.getPublicIdFromUrl(deleted.image);
        if (publicId) {
          await cloudinaryService.deleteFile(publicId);
        }
      }
    } catch (err) {
      console.warn("Cloudinary deletion failed:", err);
    }

    return deleted;
  }

  /**
   * Get blogs by category
   */
  async getBlogsByCategory(category) {
    if (!category || typeof category !== "string") {
      throw new ValidationError("Invalid category");
    }
    return await blogRepository.findByCategory(category);
  }

  /**
   * Get recent blogs
   */
  async getRecentBlogs(limit = 5) {
    const numLimit = parseInt(limit, 10);
    if (isNaN(numLimit) || numLimit < 1) {
      throw new ValidationError("Invalid limit");
    }
    return await blogRepository.findRecent(numLimit);
  }
}

// Export singleton instance
export const blogService = new BlogService();
