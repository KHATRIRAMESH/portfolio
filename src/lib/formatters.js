/**
 * Formatting Utilities
 */

/**
 * Format date to localized string
 */
export function formatDate(date, locale = "en-US", options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  return new Date(date).toLocaleDateString(locale, defaultOptions);
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now - target) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 100, suffix = "...") {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Slugify string
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
