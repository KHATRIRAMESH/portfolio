"use client";

import Blogs from "@/components/Blogs/Blogs";
import Button from "@/components/Button";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <div className="max-w-auto mx-auto py-8 min-h-screen bg-[#0F1624]">
      <Blogs />
    </div>
  );
}
