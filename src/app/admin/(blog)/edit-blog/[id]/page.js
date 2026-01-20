"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TiptapEditor from "@/components/Editor/TiptapEditor";

// import "quill/dist/quill.snow.css"; // or "react-quill/dist/quill.snow.css"
import { Label } from "@/components/ui/label";
import Button from "@/components/Button";

const EditPost = ({ params }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null); // TipTap JSON content
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState(null);

  const router = useRouter();

  // Unwrap params + auth check
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.id);
    };
    unwrapParams();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Unauthorized access. Please login.");
      router.push("/admin/login");
    }
  }, [params, router]);

  // Fetch blog meta and content (from DB)
  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setCategory(data.category);
          setImage(data.image);
          // Try parse TipTap JSON if present
          try {
            const parsed = data.content ? JSON.parse(data.content) : null;
            setContent(parsed);
          } catch {
            setContent(null);
          }
        } else {
          toast.error("Failed to fetch blog data");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload a featured image");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      // Update blog with content stored in DB
      const metaRes = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, category, image, content }),
      });

      if (!metaRes.ok) {
        const err = await metaRes.json();
        throw new Error(err.error || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
      setTimeout(() => router.push("/admin/dashboard/blogs"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleBack = () => router.push("/admin/dashboard/blogs");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1624] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1624] flex items-center justify-center py-8">
      <div className="w-full max-w-[800px] bg-[#0F1624] shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-[10px] p-8">
        <ToastContainer />
        <h1 className="text-center text-[2rem] font-semibold text-[#9cc9e3] mb-8">
          Edit Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-lg">
              Post Title:
            </Label>
            <input
              type="text"
              id="title"
              placeholder="Enter post title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1a1a2e] mt-2 p-3 border-2 border-[#444] rounded-lg text-white text-[16px] focus:outline-none focus:border-[#9cc9e3] placeholder:text-[#666]"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-lg">
              Category:
            </Label>
            <input
              type="text"
              id="category"
              placeholder="e.g., Technology, Travel, etc."
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1a1a2e] mt-2 p-3 border-2 border-[#444] rounded-lg text-white text-[16px] focus:outline-none focus:border-[#9cc9e3] placeholder:text-[#666]"
            />
          </div>

          {/* Image upload + preview (unchanged) */}
          <div>
            <Label htmlFor="file-upload" className="text-lg">
              Featured Image:
            </Label>
            <div className="mt-2 text-white">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const toastId = toast.loading("Uploading image...");
                  try {
                    const { uploadToCloudinary } =
                      await import("@/actions/upload");
                    const url = await uploadToCloudinary(file, "blogs");
                    if (url) {
                      setImage(url);
                      toast.update(toastId, {
                        render: "Image uploaded successfully!",
                        type: "success",
                        isLoading: false,
                        autoClose: 2000,
                      });
                    } else {
                      throw new Error();
                    }
                  } catch {
                    toast.update(toastId, {
                      render: "Upload failed",
                      type: "error",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  }
                }}
                className="w-full bg-[#1a1a2e] p-3 border-2 border-[#444] rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#13ADC7] file:text-white hover:file:bg-[#0F1624]/80"
              />
            </div>

            {image && (
              <div className="mt-4 relative">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full max-h-[300px] object-cover rounded-lg border border-white/10"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* TipTap Editor */}
          <div>
            <Label className="text-lg">Post Content:</Label>
            <div className="mt-2">
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button type="submit" className="bg-blue-600 text-white">
              Update Blog
            </Button>
            <Button
              type="button"
              onClick={handleBack}
              className="bg-red-600 text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
