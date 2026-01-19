/**
 * Cloudinary URL helpers for client-side image optimization
 */

/**
 * Insert a transformation segment into a Cloudinary delivery URL
 * Example: https://res.cloudinary.com/<cloud>/image/upload/v123/abc.jpg
 *   -> https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_600/v123/abc.jpg
 */
export function transformCloudinaryUrl(url, transformation = "f_auto,q_auto") {
  if (!url || typeof url !== "string") return url;
  try {
    const u = new URL(url);
    if (!u.hostname.includes("res.cloudinary.com")) return url;

    // Find '/upload/' segment and insert transformation after it
    const parts = u.pathname.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    if (uploadIndex === -1) return url;

    // If transformation already present, merge
    const nextPart = parts[uploadIndex + 1];
    const hasExisting =
      nextPart && !nextPart.startsWith("v") && nextPart.includes(",");
    if (hasExisting) {
      // Prepend our transformation to existing
      parts[uploadIndex + 1] = `${transformation},${parts[uploadIndex + 1]}`;
    } else {
      parts.splice(uploadIndex + 1, 0, transformation);
    }

    u.pathname = parts.join("/");
    return u.toString();
  } catch {
    return url;
  }
}

export function getThumbUrl(url, width = 600) {
  return transformCloudinaryUrl(url, `f_auto,q_auto,w_${width}`);
}

export function getLargeUrl(url, width = 1200) {
  return transformCloudinaryUrl(url, `f_auto,q_auto,w_${width}`);
}
