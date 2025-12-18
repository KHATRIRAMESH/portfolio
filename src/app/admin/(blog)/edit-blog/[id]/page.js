"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';

const EditPost = ({ params }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [blogId, setBlogId] = useState(null);
    const router = useRouter();

    const editorRef = useRef(null);
    const quillInstanceRef = useRef(null);

    // Unwrap params and authenticate
    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setBlogId(resolvedParams.id);
        };
        unwrapParams();

        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error("Unauthorized access. Please login.", {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/admin/login");
        }
    }, [params, router]);

    // Fetch existing blog data
    useEffect(() => {
        const fetchBlog = async () => {
            if (!blogId) return;

            try {
                const res = await fetch(`/api/blogs/${blogId}`);
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title);
                    setCategory(data.category);
                    setImage(data.image);
                    setContent(data.content);

                    // If quill is already initialized, set its content
                    if (quillInstanceRef.current) {
                        quillInstanceRef.current.root.innerHTML = data.content;
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

    // Initialize Quill
    useEffect(() => {
        const initQuill = async () => {
            if (editorRef.current && !quillInstanceRef.current) {
                const Quill = (await import('quill')).default;

                const quill = new Quill(editorRef.current, {
                    theme: "snow",
                    placeholder: "Write something interesting...",
                    modules: {
                        toolbar: [
                            [{ 'header': [2, 3, false] }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'blockquote', 'code-block'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ]
                    }
                });

                quill.on("text-change", () => {
                    setContent(quill.root.innerHTML);
                });

                quillInstanceRef.current = quill;

                // If content was fetched before quill init, set it now
                if (content) {
                    quill.root.innerHTML = content;
                }
            }
        };

        initQuill();

        return () => {
            if (quillInstanceRef.current) {
                quillInstanceRef.current = null;
            }
        };
    }, []); // Only run once on mount

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
            const token = localStorage.getItem('adminToken');

            const res = await fetch(`/api/blogs/${blogId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    image
                })
            });

            if (res.status === 200) {
                toast.success("Blog updated successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                });

                setTimeout(() => {
                    router.push("/admin/dashboard/blogs");
                }, 2000);
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update blog", {
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
        router.push("/admin/dashboard/blogs");
    };

    if (loading) return <div className="min-h-screen bg-[#0F1624] flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0F1624] flex items-center justify-center py-8">
            <div className="w-full max-w-[800px] bg-[#0F1624] shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-[10px] p-8">
                <ToastContainer />
                <h1 className="text-center text-[2rem] font-semibold text-[#9cc9e3] mb-8">Edit Blog Post</h1>

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
                                        const { uploadToCloudinary } = await import('@/actions/upload');
                                        const url = await uploadToCloudinary(file, 'blogs');
                                        if (url) {
                                            setImage(url);
                                            toast.update(toastId, { render: "Image uploaded successfully!", type: "success", isLoading: false, autoClose: 2000 });
                                        } else {
                                            toast.update(toastId, { render: "Upload failed", type: "error", isLoading: false, autoClose: 3000 });
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        toast.update(toastId, { render: "Upload failed", type: "error", isLoading: false, autoClose: 3000 });
                                    }
                                }}
                                className="w-full bg-[#1a1a2e] p-3 border-2 border-[#444] rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#13ADC7] file:text-white hover:file:bg-[#0F1624]/80"
                            />
                        </div>
                        {image && (
                            <div className="mt-4 relative">
                                <img src={image} alt="Preview" className="w-full max-h-[300px] object-cover rounded-lg border border-white/10" />
                                <button
                                    type="button"
                                    onClick={() => setImage('')}
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
                        <div className="h-[300px] mt-2 p-3 border-2 border-[#444] rounded-lg bg-[#1a1a2e] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-[#444] [&_.ql-container]:border-none [&_.ql-container]:text-[16px] [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-white [&_.ql-editor.ql-blank::before]:text-[#666]">
                            <div ref={editorRef}></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white"
                        >
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
