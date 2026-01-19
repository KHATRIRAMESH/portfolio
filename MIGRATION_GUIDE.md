# Migration Guide - From Old to New Modular Architecture

This guide helps you migrate existing code to use the new modular architecture.

## 🔄 Before & After Examples

### 1. Component Making API Calls

#### ❌ Before (Old Way)

```javascript
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  );
}
```

#### ✅ After (New Way)

```javascript
"use client";

import { useBlogs } from "@/hooks/useBlog";
import { formatDate } from "@/lib/formatters";

export default function BlogList() {
  const { blogs, loading, error } = useBlogs();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.title}
          <small>{formatDate(blog.createdAt)}</small>
        </div>
      ))}
    </div>
  );
}
```

**Benefits:**

- Less boilerplate code
- Reusable hook logic
- Consistent error handling
- Built-in loading state
- Formatted data display

---

### 2. API Route Handlers

#### ❌ Before (Old Way)

```javascript
import { db } from "@/db/drizzle";
import { blogTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const blogs = await db
      .select()
      .from(blogTable)
      .orderBy(desc(blogTable.createdAt));
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
```

#### ✅ After (New Way)

```javascript
import { NextResponse } from "next/server";
import { blogService } from "@/services/blogService";
import { handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const blogs = await blogService.getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
```

**Benefits:**

- Separation of concerns
- Business logic in service layer
- Consistent error handling
- Easier to test
- More maintainable

---

### 3. Authentication Checks

#### ❌ Before (Old Way)

```javascript
export async function POST(request) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Continue with logic...
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
```

#### ✅ After (New Way)

```javascript
import { authService } from "@/services/authService";

export async function POST(request) {
  if (!authService.isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Continue with logic...
}
```

**Benefits:**

- Centralized auth logic
- Reusable across routes
- Easier to update
- Consistent behavior

---

### 4. Data Validation

#### ❌ Before (Old Way)

```javascript
export async function POST(request) {
  const { title, content } = await request.json();

  if (!title || title.trim() === "") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  // Insert into database...
}
```

#### ✅ After (New Way)

```javascript
import { blogService } from "@/services/blogService";
import { handleApiError } from "@/lib/errors";

export async function POST(request) {
  try {
    const data = await request.json();
    const blog = await blogService.createBlog(data); // Validation inside
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
```

**Benefits:**

- Validation in service layer
- Reusable validation logic
- Automatic error formatting
- Cleaner API routes

---

### 5. File Upload

#### ❌ Before (Old Way)

```javascript
"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const dataURI = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "portfolio/images",
      transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
    });
    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return "";
  }
}
```

#### ✅ After (New Way)

```javascript
"use server";

import { cloudinaryService } from "@/services/cloudinaryService";

export async function uploadFile(file) {
  return await cloudinaryService.uploadFile(file, "images");
}
```

**Benefits:**

- Centralized configuration
- Reusable service
- Consistent error handling
- Much cleaner code

---

### 6. Date Formatting

#### ❌ Before (Old Way)

```javascript
export default function BlogCard({ blog }) {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
```

#### ✅ After (New Way)

```javascript
import { formatDate, formatRelativeTime } from "@/lib/formatters";

export default function BlogCard({ blog }) {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{formatDate(blog.createdAt)}</p>
      <small>{formatRelativeTime(blog.createdAt)}</small>
    </div>
  );
}
```

**Benefits:**

- Consistent formatting
- Reusable across app
- Easy to change format globally
- Additional formatting options

---

### 7. Environment Variables

#### ❌ Before (Old Way)

```javascript
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
```

#### ✅ After (New Way)

```javascript
import config from "@/config";

const jwtSecret = config.auth.jwtSecret;
const cloudinaryName = config.cloudinary.cloudName;
```

**Benefits:**

- Centralized configuration
- Type-safe access
- Easy to update
- Single source of truth

---

### 8. Protected Component

#### ❌ Before (Old Way)

```javascript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return <div>Admin Content</div>;
}
```

#### ✅ After (New Way)

```javascript
"use client";

import { useRequireAuth } from "@/hooks/useAuth";

export default function AdminPage() {
  const { loading } = useRequireAuth();

  if (loading) return <div>Loading...</div>;

  return <div>Admin Content</div>;
}
```

**Benefits:**

- Automatic redirect
- Loading state
- Reusable hook
- Less boilerplate

---

## 📋 Migration Checklist

When migrating a component/route:

### For Components

- [ ] Replace direct API calls with custom hooks
- [ ] Remove local state management (useState, useEffect)
- [ ] Use formatters for data display
- [ ] Handle loading and error states from hooks
- [ ] Replace date formatting with `formatDate()`
- [ ] Use `useAuth()` for auth state

### For API Routes

- [ ] Import and use services instead of direct DB access
- [ ] Replace manual auth checks with `authService`
- [ ] Use `handleApiError()` for consistent errors
- [ ] Remove manual validation (let service handle it)
- [ ] Import from `@/services/` not `@/db/`

### For Server Actions

- [ ] Delegate to appropriate service
- [ ] Remove duplicate configuration
- [ ] Use centralized error handling

## 🎯 Priority Migration Order

1. **High Priority** (Do First)
   - API routes (`app/api/**/*.js`)
   - Main components (`components/Blogs/`, `components/Header/`)
   - Admin pages (`app/admin/**/page.js`)

2. **Medium Priority**
   - Other components
   - Server actions
   - Utility functions

3. **Low Priority** (Nice to Have)
   - Static pages
   - Configuration files
   - Documentation

## 🔍 Finding Code to Migrate

### Search for these patterns:

```bash
# Direct axios usage in components
grep -r "axios" src/components/

# Direct fetch in components
grep -r "fetch(" src/components/

# Direct DB access in API routes
grep -r "from '@/db/drizzle'" src/app/api/

# Manual auth checks
grep -r "jwt.verify" src/

# Direct date formatting
grep -r "new Date.*toLocale" src/
```

## ✨ Quick Wins

Start with these easy migrations:

1. **Date formatting** - Search & replace with `formatDate()`
2. **Config usage** - Replace `process.env` with `config`
3. **Auth checks** - Replace manual JWT with `authService`
4. **Error responses** - Use `handleApiError()`

## 🚨 Common Pitfalls

1. **Don't skip the service layer**
   - ❌ Component → API Client → Database
   - ✅ Component → Hook → API Route → Service → Repository → Database

2. **Don't put business logic in repositories**
   - Repositories: Only database operations
   - Services: Business logic and validation

3. **Don't forget error handling**
   - Always use try-catch with `handleApiError()`

4. **Don't mix old and new patterns**
   - Choose one approach and stick with it

## 💡 Tips

- Migrate file by file, test as you go
- Start with simple files before complex ones
- Keep the old code commented out initially
- Update tests alongside code
- Document any issues you encounter

---

Ready to migrate? Start with the checklist above! 🚀
