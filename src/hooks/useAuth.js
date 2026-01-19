/**
 * Authentication Hooks
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

/**
 * Hook to manage authentication state
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      // Optionally decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (e) {
        console.error("Failed to decode token");
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await apiClient.post("/api/auth/login", {
        username,
        password,
      });

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        checkAuth();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/admin/login");
  }, [router]);

  return {
    isAuthenticated,
    loading,
    user,
    login,
    logout,
    checkAuth,
  };
}

/**
 * Hook to protect routes (redirect if not authenticated)
 */
export function useRequireAuth(redirectTo = "/admin/login") {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  return { isAuthenticated, loading };
}
