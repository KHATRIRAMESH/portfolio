"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getThumbUrl } from "@/lib/cloudinary";
import { useBlogs } from "@/hooks/useBlog";
import { formatDate } from "@/lib/formatters";
import Header from "../Header/Header";
import Button from "../Button";
import { StepBack } from "lucide-react";

const Blogs = () => {
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return (
      <section
        className="flex flex-col p-0 mx-auto max-w-5xl box-content overflow-hidden relative sm:p-4 sm:w-full"
        id="blogs"
      >
        <div className="w-16 h-1.5 rounded-[10px] bg-gradient-to-r from-[#13ADC7] to-[#945DD6] my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
        <h2 className="font-extrabold text-[65px] leading-[72px] mb-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[56px] md:leading-[56px] w-full">
          Blogs
        </h2>
        <div className="text-white text-center py-12">Loading blogs...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="flex flex-col p-0 mx-auto max-w-5xl box-content overflow-hidden relative sm:p-4 sm:w-full"
        id="blogs"
      >
        <div className="w-16 h-1.5 rounded-[10px] bg-gradient-to-r from-[#13ADC7] to-[#945DD6] my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
        <Link href="/">
          <Button>
            <StepBack /> <span>Back to Home</span>
          </Button>
        </Link>
        <h2 className="font-extrabold text-[65px] leading-[72px] mb-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[56px] md:leading-[56px] w-full">
          Blogs
        </h2>
        <div className="text-red-400 text-center py-12">{error}</div>
      </section>
    );
  }

  return (
    <div>
      <section
        className="flex flex-col p-0 mx-auto max-w-5xl box-content overflow-hidden relative sm:p-4 sm:w-full"
        id="blogs"
      >
        <div className="w-16 h-1.5 rounded-[10px] bg-gradient-to-r from-[#13ADC7] to-[#945DD6] my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
        <h2 className="font-extrabold text-[65px] leading-[72px] mb-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[56px] md:leading-[56px] w-full">
          Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12 sm:p-4">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="no-underline text-inherit w-full h-full block"
            >
              <div className="bg-[#0F1624] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full border border-white/5 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getThumbUrl(
                      blog.image || "https://via.placeholder.com/400",
                      600,
                    )}
                    fill
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#13ADC7]/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {blog.category || "Article"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#13ADC7] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Removed heavy HTML preview for faster list rendering */}
                  <p className="text-[#e4e6e7] text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                    Explore this article →
                  </p>

                  <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center text-xs text-gray-400">
                    <span>Read More →</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
