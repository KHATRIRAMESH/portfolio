"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
    file,
    folder
) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64File}`;

    const targetFolder = `portfolio/${folder}`;

    try {
        const uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: targetFolder,
            transformation:
                folder === "images"
                    ? [{ width: 1200, crop: "limit" }, { quality: "auto" }]
                    : undefined, // no transformation for resumes or docs
            access_mode: "public",
        });

        console.log(uploadResult);
        return uploadResult.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return "";
    }
}
