/**
 * Legacy auth.js - now delegates to authService
 * Kept for backward compatibility
 */

import { authService } from "@/services/authService";

export function signToken(payload) {
  return authService.signToken(payload);
}

export function verifyToken(token) {
  try {
    return authService.verifyToken(token);
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request) {
  return authService.getTokenFromRequest(request);
}

export function isAuthenticated(request) {
  return authService.isAuthenticated(request);
}
