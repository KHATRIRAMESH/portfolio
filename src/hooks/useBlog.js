/**
 * Custom React Hooks
 * Reusable hooks for blog operations
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/apiClient";

/**
 * Hook to fetch all blogs
 */
export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get("/api/blogs/summary");
      setBlogs(data);
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading, error, refetch: fetchBlogs };
}

/**
 * Hook to fetch a single blog by ID
 */
export function useBlog(id) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get(`/api/blogs/${id}`);
      setBlog(data);
    } catch (err) {
      setError(err.message || "Failed to fetch blog");
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { blog, loading, error, refetch: fetchBlog };
}

/**
 * Hook to create a blog
 */
export function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.post("/api/blogs", blogData);
      return data;
    } catch (err) {
      setError(err.message || "Failed to create blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBlog, loading, error };
}

/**
 * Hook to update a blog
 */
export function useUpdateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBlog = async (id, blogData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.put(`/api/blogs/${id}`, blogData);
      return data;
    } catch (err) {
      setError(err.message || "Failed to update blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateBlog, loading, error };
}

/**
 * Hook to delete a blog
 */
export function useDeleteBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.delete(`/api/blogs/${id}`);
    } catch (err) {
      setError(err.message || "Failed to delete blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlog, loading, error };
}
