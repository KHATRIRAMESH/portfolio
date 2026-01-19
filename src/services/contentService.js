/**
 * Content Service
 * Stores and retrieves blog content JSON externally (Cloudinary RAW)
 */

import config from "@/config";
import { cloudinaryService } from "@/services/cloudinaryService";
import { NotFoundError, ValidationError } from "@/lib/errors";

export class ContentService {
  /**
   * Build deterministic public id for a blog content JSON
   */
  getBlogContentPublicId(id) {
    if (!id) throw new ValidationError("Blog ID is required");
    return `${config.cloudinary.defaultFolder}/blogs/content/${id}`;
  }

  /**
   * Get URL to the blog content JSON
   */
  getBlogContentUrl(id) {
    const publicId = this.getBlogContentPublicId(id);
    return cloudinaryService.getRawUrl(publicId, "json");
  }

  /**
   * Fetch the blog content JSON
   */
  async getBlogContent(id) {
    const url = this.getBlogContentUrl(id);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new NotFoundError("Content not found");
      }
      return await res.json();
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new NotFoundError("Content not found");
    }
  }

  /**
   * Save blog content JSON
   */
  async saveBlogContent(id, json) {
    const publicId = this.getBlogContentPublicId(id);
    return await cloudinaryService.uploadJson(publicId, json);
  }
}

export const contentService = new ContentService();
