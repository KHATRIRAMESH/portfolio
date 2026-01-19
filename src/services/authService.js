/**
 * Authentication Service
 * Handles authentication logic
 */

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "@/config";
import { AuthenticationError, ValidationError } from "@/lib/errors";

export class AuthService {
  /**
   * Sign a JWT token
   */
  signToken(payload) {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.tokenExpiry,
    });
  }

  /**
   * Verify a JWT token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.auth.jwtSecret);
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token");
    }
  }

  /**
   * Extract token from request headers
   */
  getTokenFromRequest(request) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Check if request is authenticated
   */
  isAuthenticated(request) {
    try {
      const token = this.getTokenFromRequest(request);
      if (!token) return false;

      const payload = this.verifyToken(token);
      return !!payload;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user payload from request
   */
  getUserFromRequest(request) {
    const token = this.getTokenFromRequest(request);
    if (!token) {
      throw new AuthenticationError("No token provided");
    }

    return this.verifyToken(token);
  }

  /**
   * Hash password
   */
  async hashPassword(password) {
    if (!password || password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters");
    }
    return await bcrypt.hash(password, 10);
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Validate login credentials (example - adapt to your needs)
   */
  async validateLogin(username, password) {
    // This is a simplified example
    // In a real app, you'd check against a database
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (username !== ADMIN_USERNAME) {
      throw new AuthenticationError("Invalid credentials");
    }

    // In production, use hashed password comparison
    if (password !== ADMIN_PASSWORD) {
      throw new AuthenticationError("Invalid credentials");
    }

    return {
      username,
      role: "admin",
    };
  }
}

// Export singleton instance
export const authService = new AuthService();
