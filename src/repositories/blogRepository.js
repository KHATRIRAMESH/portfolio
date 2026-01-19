/**
 * Blog Repository
 * Handles all database operations for blogs
 */

import { db } from "@/db/drizzle";
import { blogTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { DatabaseError, NotFoundError } from "@/lib/errors";

export class BlogRepository {
  /**
   * Get all blogs ordered by creation date
   */
  async findAll() {
    try {
      const blogs = await db
        .select()
        .from(blogTable)
        .orderBy(desc(blogTable.createdAt));
      return blogs;
    } catch (error) {
      console.error("Database error in findAll:", error);
      throw new DatabaseError("Failed to fetch blogs");
    }
  }

  /**
   * Get a single blog by ID
   */
  async findById(id) {
    try {
      const blogs = await db
        .select()
        .from(blogTable)
        .where(eq(blogTable.id, id))
        .limit(1);

      if (blogs.length === 0) {
        throw new NotFoundError(`Blog with ID ${id} not found`);
      }

      return blogs[0];
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Database error in findById:", error);
      throw new DatabaseError("Failed to fetch blog");
    }
  }

  /**
   * Create a new blog
   */
  async create(blogData) {
    try {
      const result = await db
        .insert(blogTable)
        .values({
          ...blogData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return result[0];
    } catch (error) {
      console.error("Database error in create:", error);
      throw new DatabaseError("Failed to create blog");
    }
  }

  /**
   * Update an existing blog
   */
  async update(id, blogData) {
    try {
      const result = await db
        .update(blogTable)
        .set({
          ...blogData,
          updatedAt: new Date(),
        })
        .where(eq(blogTable.id, id))
        .returning();

      if (result.length === 0) {
        throw new NotFoundError(`Blog with ID ${id} not found`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Database error in update:", error);
      throw new DatabaseError("Failed to update blog");
    }
  }

  /**
   * Delete a blog
   */
  async delete(id) {
    try {
      const result = await db
        .delete(blogTable)
        .where(eq(blogTable.id, id))
        .returning();

      if (result.length === 0) {
        throw new NotFoundError(`Blog with ID ${id} not found`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error("Database error in delete:", error);
      throw new DatabaseError("Failed to delete blog");
    }
  }

  /**
   * Get blogs by category
   */
  async findByCategory(category) {
    try {
      const blogs = await db
        .select()
        .from(blogTable)
        .where(eq(blogTable.category, category))
        .orderBy(desc(blogTable.createdAt));

      return blogs;
    } catch (error) {
      console.error("Database error in findByCategory:", error);
      throw new DatabaseError("Failed to fetch blogs by category");
    }
  }

  /**
   * Get recent blogs with limit
   */
  async findRecent(limit = 5) {
    try {
      const blogs = await db
        .select()
        .from(blogTable)
        .orderBy(desc(blogTable.createdAt))
        .limit(limit);

      return blogs;
    } catch (error) {
      console.error("Database error in findRecent:", error);
      throw new DatabaseError("Failed to fetch recent blogs");
    }
  }
}

// Export singleton instance
export const blogRepository = new BlogRepository();
