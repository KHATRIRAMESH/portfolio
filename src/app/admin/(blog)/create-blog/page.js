"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header/Header";
import TiptapEditor from "@/components/Editor/TiptapEditor";
import { StepBack } from "lucide-react";
import Link from "next/link";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null); // TipTap JSON
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Unauthorized access. Please login.", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/admin/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a featured image", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      // Create blog with content stored in DB
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, category, image, content }),
      });

      if (res.status === 201) {
        toast.success("Blog created successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        setPublished(true);

        setTimeout(() => {
          router.push("/blogs");
        }, 2000);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create blog", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleBack = () => {
    router.push("/blogs");
  };

  return (
    <div className="min-h-screen bg-[#0F1624] flex flex-col items-center justify-center py-8">
      <Link href="/admin/dashboard/blogs" className="self-start mb-4 ml-4">
        <Button className="flex items-center">
          <StepBack /> <span>Back to Blogs</span>
        </Button>
      </Link>
      <div className="w-full max-w-[800px] bg-[#0F1624] shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-[10px] p-8">
        <ToastContainer />
        <h1 className="text-center text-[2rem] font-semibold text-[#9cc9e3] mb-8">
          Create a New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                      toast.update(toastId, {
                        render: "Upload failed",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                      });
                    }
                  } catch (error) {
                    console.error(error);
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

          <div>
            <Label htmlFor="content" className="text-lg">
              Post Content:
            </Label>
            <div className="mt-2">
              <TiptapEditor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button type="submit" className="bg-green-500 text-white">
              {published ? "Publishing..." : "Publish Post"}
            </Button>
            <Button
              type="button"
              onClick={handleBack}
              className="bg-red-600 text-white"
            >
              Back to Blogs
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
