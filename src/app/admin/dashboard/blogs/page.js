"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error("Unauthorized access. Please login.", {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/admin/login");
        }
    }, [router]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blogs");
                if (res.ok) {
                    const data = await res.json();
                    setBlogs(data);
                } else {
                    toast.error("Failed to fetch blogs");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push("/admin/login");
    };

    if (loading) return <div className="min-h-screen bg-[#0F1624] flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0F1624] p-8">
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-[#9cc9e3]">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/create-blog" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Create New Post
                        </Link>
                        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-xl overflow-hidden border border-white/10">
                    <table className="w-full text-left text-white">
                        <thead className="bg-[#0F1624] text-[#13ADC7] uppercase text-sm">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-white/5 transition">
                                    <td className="px-6 py-4 font-medium">{blog.title}</td>
                                    <td className="px-6 py-4 text-gray-400">{blog.category}</td>
                                    <td className="px-6 py-4 text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link href={`/admin/edit-blog/${blog.id}`} className="text-[#13ADC7] hover:underline font-medium">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
