'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function BlogDetailPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogId, setBlogId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Unwrap the params Promise
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.status === 404 ? 'Blog not found' : 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13ADC7]"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl text-red-400 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-400 mb-6">{error}</p>
      <Link href="/blogs" className="text-[#13ADC7] hover:underline">← Back to Blogs</Link>
    </div>
  );

  if (!blog) return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl text-white mb-4">Blog Post Not Found</h2>
      <Link href="/blogs" className="text-[#13ADC7] hover:underline">← Back to Blogs</Link>
    </div>
  );

  return (
    <article className="max-w-4xl mx-auto py-20 px-6 sm:px-4 sm:py-12 bg-[#0F1624] min-h-screen">
      <Link href="/blogs" className="inline-flex items-center gap-2 text-[#9cc9e3] hover:text-[#13ADC7] transition-colors duration-300 mb-10 group">
        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Blogs
      </Link>

      <header className="mb-12 border-b border-white/10 pb-12">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <span className="bg-[#13ADC7]/10 text-[#13ADC7] border border-[#13ADC7]/20 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide">
            {blog.category}
          </span>
          <span className="text-gray-400 text-sm">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
          {blog.title}
        </h1>

        {blog.image && (
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <img src={blog.image} alt={blog.title} className="w-full max-h-[500px] object-cover" />
          </div>
        )}
      </header>

      <div className="prose prose-lg prose-invert max-w-none text-[#e4e6e7] leading-relaxed">
        <div className="whitespace-pre-wrap">{blog.content}</div>
      </div>

      <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
        <span className="text-gray-500 text-sm">Thanks for reading!</span>
        <div className="flex gap-4">
          {/* Share buttons or similar could go here */}
        </div>
      </div>
    </article>
  );
}
