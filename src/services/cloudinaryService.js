/**
 * Cloudinary Service
 * Handles image upload operations
 */

import { v2 as cloudinary } from "cloudinary";
import config from "@/config";
import { ValidationError } from "@/lib/errors";

// Configure cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export class CloudinaryService {
  /**
   * Upload file to Cloudinary
   */
  async uploadFile(file, folder = "images") {
    if (!file) {
      throw new ValidationError("No file provided");
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64File = buffer.toString("base64");
      const dataURI = `data:${file.type};base64,${base64File}`;

      const targetFolder = `${config.cloudinary.defaultFolder}/${folder}`;

      const uploadOptions = {
        folder: targetFolder,
        access_mode: "public",
      };

      // Apply transformations for images
      if (folder === "images") {
        uploadOptions.transformation = config.cloudinary.imageTransformations;
      }

      const uploadResult = await cloudinary.uploader.upload(
        dataURI,
        uploadOptions,
      );

      return uploadResult.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload file");
    }
  }

  /**
   * Upload raw JSON content to Cloudinary with a deterministic public id
   * @param {string} publicId - e.g., `portfolio/blogs/content/123`
   * @param {object} json - JSON content to upload
   * @returns {Promise<string>} secure URL of the uploaded JSON
   */
  async uploadJson(publicId, json) {
    if (!publicId) {
      throw new ValidationError("Public ID is required");
    }
    if (json == null) {
      throw new ValidationError("JSON content is required");
    }

    try {
      const jsonString = typeof json === "string" ? json : JSON.stringify(json);
      const base64 = Buffer.from(jsonString, "utf8").toString("base64");
      const dataURI = `data:application/json;base64,${base64}`;

      const res = await cloudinary.uploader.upload(dataURI, {
        public_id: publicId,
        overwrite: true,
        resource_type: "raw",
        format: "json",
        access_mode: "public",
      });

      return res.secure_url;
    } catch (error) {
      console.error("Error uploading JSON to Cloudinary:", error);
      throw new Error("Failed to upload JSON");
    }
  }

  /**
   * Build a Cloudinary raw URL for a given public id
   * @param {string} publicId - e.g., `portfolio/blogs/content/123`
   * @param {string} ext - file extension (default json)
   */
  getRawUrl(publicId, ext = "json") {
    return cloudinary.url(publicId, {
      resource_type: "raw",
      format: ext,
      type: "upload",
      secure: true,
    });
  }

  /**
   * Delete file from Cloudinary
   */
  async deleteFile(publicId) {
    if (!publicId) {
      throw new ValidationError("No public ID provided");
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      throw new Error("Failed to delete file");
    }
  }

  /**
   * Extract Cloudinary public_id from a secure URL
   * Example:
   * https://res.cloudinary.com/<cloud>/image/upload/v1699999999/portfolio/blogs/abc123.jpg
   *  => portfolio/blogs/abc123
   */
  getPublicIdFromUrl(url) {
    try {
      const u = new URL(url);
      if (!u.hostname.includes("res.cloudinary.com")) return null;
      const parts = u.pathname.split("/").filter(Boolean);
      const uploadIndex = parts.findIndex((p) => p === "upload");
      if (uploadIndex === -1) return null;

      // Typically next segment is version (e.g., v12345). There could be transformations in URLs we generate for delivery,
      // but secure_url returned by upload normally has no transformations and includes a version segment.
      let i = uploadIndex + 1;
      // Skip transformation segments (those not starting with 'v' and not a folder/file path)
      while (i < parts.length && !/^v\d+$/i.test(parts[i])) {
        i++;
      }
      // Skip version segment
      if (i < parts.length && /^v\d+$/i.test(parts[i])) {
        i++;
      }

      // Remaining path is folder/filename.ext => join and strip extension
      const publicPath = parts.slice(i).join("/");
      if (!publicPath) return null;
      return publicPath.replace(/\.[^/.]+$/, "");
    } catch {
      return null;
    }
  }

  /**
   * Get optimized image URL
   */
  getOptimizedUrl(publicId, options = {}) {
    return cloudinary.url(publicId, {
      quality: "auto",
      fetch_format: "auto",
      ...options,
    });
  }
}

// Export singleton instance
export const cloudinaryService = new CloudinaryService();
