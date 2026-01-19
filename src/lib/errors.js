/**
 * Custom Error Classes for Better Error Handling
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, 500);
  }
}

/**
 * Error handler for API routes
 */
export function handleApiError(error) {
  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  // Log unexpected errors
  console.error("Unexpected error:", error);

  return {
    error: "An unexpected error occurred",
    statusCode: 500,
  };
}

/**
 * Format error for client
 */
export function formatErrorForClient(error) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  };
}
