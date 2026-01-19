/**
 * Validation Utilities
 */

import { ValidationError } from "./errors";

/**
 * Validate blog data
 */
export function validateBlogData(data) {
  const errors = [];

  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.push("Title is required and must be a non-empty string");
  }

  if (data.title && data.title.length > 200) {
    errors.push("Title must not exceed 200 characters");
  }

  // Accept either string (HTML) or object (TipTap JSON)
  if (!data.content) {
    errors.push("Content is required");
  } else if (
    typeof data.content !== "string" &&
    typeof data.content !== "object"
  ) {
    errors.push("Content must be a string or JSON object");
  } else if (
    typeof data.content === "string" &&
    data.content.trim().length === 0
  ) {
    errors.push("Content must not be empty");
  }

  if (
    !data.category ||
    typeof data.category !== "string" ||
    data.category.trim().length === 0
  ) {
    errors.push("Category is required and must be a non-empty string");
  }

  if (
    !data.image ||
    typeof data.image !== "string" ||
    data.image.trim().length === 0
  ) {
    errors.push("Image URL is required and must be a non-empty string");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return {
    title: data.title.trim(),
    // Normalize: if object, stringify; if string, trim
    content:
      typeof data.content === "object"
        ? JSON.stringify(data.content)
        : data.content.trim(),
    category: data.category.trim(),
    image: data.image.trim(),
  };
}

/**
 * Validate blog meta data (without content)
 * Used when content is stored externally
 */
export function validateBlogMeta(data) {
  const errors = [];

  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.push("Title is required and must be a non-empty string");
  }
  if (data.title && data.title.length > 200) {
    errors.push("Title must not exceed 200 characters");
  }

  if (
    !data.category ||
    typeof data.category !== "string" ||
    data.category.trim().length === 0
  ) {
    errors.push("Category is required and must be a non-empty string");
  }

  if (
    !data.image ||
    typeof data.image !== "string" ||
    data.image.trim().length === 0
  ) {
    errors.push("Image URL is required and must be a non-empty string");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return {
    title: data.title.trim(),
    category: data.category.trim(),
    image: data.image.trim(),
  };
}

/**
 * Validate email
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  return { valid: true };
}

/**
 * Sanitize HTML content (basic)
 */
export function sanitizeHtml(html) {
  // Basic sanitization - you might want to use a library like DOMPurify for production
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );
}
