/**
 * Library Utilities Exports
 * Central export point for all utility functions
 */

// API Client
export { apiClient, ApiClient, axiosInstance } from "./apiClient";

// Error Handling
export {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  DatabaseError,
  handleApiError,
  formatErrorForClient,
} from "./errors";

// Validators
export {
  validateBlogData,
  validateEmail,
  validatePassword,
  sanitizeHtml,
} from "./validators";

// Formatters
export {
  formatDate,
  formatRelativeTime,
  truncateText,
  stripHtml,
  formatFileSize,
  slugify,
} from "./formatters";

// Helpers
export {
  debounce,
  throttle,
  deepClone,
  isEmpty,
  generateId,
  sleep,
  retry,
  groupBy,
  pick,
  omit,
} from "./helpers";

// Legacy Auth (backward compatibility)
export {
  signToken,
  verifyToken,
  getTokenFromRequest,
  isAuthenticated,
} from "./auth";
