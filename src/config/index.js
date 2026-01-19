/**
 * Application Configuration Module
 * Centralizes all environment variables and app settings
 */

export const config = {
  // Authentication
  auth: {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-this",
    tokenExpiry: "7d",
    cookieName: "adminToken",
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    defaultFolder: "portfolio",
    imageTransformations: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
  },

  // Database
  database: {
    url: process.env.DATABASE_URL,
  },

  // API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    timeout: 30000,
  },

  // App
  app: {
    name: "Portfolio",
    environment: process.env.NODE_ENV || "development",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
};

export default config;
