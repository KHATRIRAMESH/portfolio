"use server";

import { cloudinaryService } from "@/services/cloudinaryService";

/**
 * Server action to upload files to Cloudinary
 * Delegates to cloudinaryService
 */
export async function uploadToCloudinary(file, folder) {
  return await cloudinaryService.uploadFile(file, folder);
}
