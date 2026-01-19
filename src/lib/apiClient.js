/**
 * API Client Module
 * Centralized HTTP client with error handling
 */

"use client";

import axios from "axios";
import config from "@/config";

/**
 * Create axios instance with default config
 */
const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to add auth token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor for error handling
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }
          break;
        case 403:
          console.error("Forbidden access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("API error:", data);
      }

      // Throw formatted error
      throw new Error(data?.error || data?.message || "An error occurred");
    } else if (error.request) {
      // Request made but no response
      throw new Error("No response from server. Please check your connection.");
    } else {
      // Something else happened
      throw new Error(error.message || "An unexpected error occurred");
    }
  },
);

/**
 * API Client class with typed methods
 */
export class ApiClient {
  /**
   * GET request
   */
  async get(url, config = {}) {
    const response = await axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post(url, data = {}, config = {}) {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put(url, data = {}, config = {}) {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch(url, data = {}, config = {}) {
    const response = await axiosInstance.patch(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete(url, config = {}) {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  }

  /**
   * Upload file with multipart/form-data
   */
  async uploadFile(url, formData, onUploadProgress) {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Also export the axios instance for advanced use cases
export { axiosInstance };
