# Quick Reference Guide - Modular Development

## 📝 Common Patterns

### 1. Creating a New Service

```javascript
// src/services/exampleService.js
import { exampleRepository } from "@/repositories/exampleRepository";
import { ValidationError } from "@/lib/errors";

export class ExampleService {
  async getAll() {
    return await exampleRepository.findAll();
  }

  async getById(id) {
    if (!id) throw new ValidationError("ID is required");
    return await exampleRepository.findById(id);
  }

  async create(data) {
    // Validate data
    if (!data.name) throw new ValidationError("Name is required");

    // Business logic here
    const processedData = { ...data, slug: data.name.toLowerCase() };

    return await exampleRepository.create(processedData);
  }
}

export const exampleService = new ExampleService();
```

### 2. Creating a New Repository

```javascript
// src/repositories/exampleRepository.js
import { db } from "@/db/drizzle";
import { exampleTable } from "@/db/schema";
import { DatabaseError, NotFoundError } from "@/lib/errors";

export class ExampleRepository {
  async findAll() {
    try {
      return await db.select().from(exampleTable);
    } catch (error) {
      throw new DatabaseError("Failed to fetch items");
    }
  }

  async findById(id) {
    try {
      const items = await db
        .select()
        .from(exampleTable)
        .where(eq(exampleTable.id, id))
        .limit(1);

      if (items.length === 0) {
        throw new NotFoundError(`Item ${id} not found`);
      }

      return items[0];
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError("Failed to fetch item");
    }
  }

  async create(data) {
    try {
      const result = await db.insert(exampleTable).values(data).returning();
      return result[0];
    } catch (error) {
      throw new DatabaseError("Failed to create item");
    }
  }
}

export const exampleRepository = new ExampleRepository();
```

### 3. Creating a Custom Hook

```javascript
// src/hooks/useExample.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/apiClient";

export function useExamples() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get("/api/examples");
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
}
```

### 4. Creating an API Route

```javascript
// src/app/api/examples/route.js
import { NextResponse } from "next/server";
import { exampleService } from "@/services/exampleService";
import { authService } from "@/services/authService";
import { handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const items = await exampleService.getAll();
    return NextResponse.json(items);
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function POST(request) {
  try {
    // Check auth
    if (!authService.isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const item = await exampleService.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
```

### 5. Using Hook in Component

```javascript
// src/components/ExampleList.js
"use client";

import { useExamples } from "@/hooks/useExample";
import { formatDate } from "@/lib/formatters";

export default function ExampleList() {
  const { items, loading, error } = useExamples();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{formatDate(item.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🎯 Import Patterns

### Single Imports

```javascript
import { blogService } from "@/services/blogService";
import { useBlogs } from "@/hooks/useBlog";
import { formatDate } from "@/lib/formatters";
```

### Multiple Imports from Index

```javascript
import { ValidationError, NotFoundError, handleApiError } from "@/lib/errors";

import { useBlogs, useCreateBlog } from "@/hooks/useBlog";
```

### Service Layer Import

```javascript
// Good
import { blogService } from "@/services/blogService";

// Also good (using index)
import { blogService } from "@/services";
```

## 🔐 Authentication Patterns

### In API Route

```javascript
import { authService } from "@/services/authService";

export async function POST(request) {
  // Simple check
  if (!authService.isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user data
  const user = authService.getUserFromRequest(request);
  // ... use user data
}
```

### In Component (Route Protection)

```javascript
import { useRequireAuth } from "@/hooks/useAuth";

export default function ProtectedPage() {
  const { isAuthenticated, loading } = useRequireAuth();

  if (loading) return <Loading />;
  // Will auto-redirect if not authenticated

  return <ProtectedContent />;
}
```

### Login Example

```javascript
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Success - will update auth state
    } catch (error) {
      // Handle error
    }
  };
}
```

## 📊 Data Validation

```javascript
import { validateBlogData, validateEmail } from "@/lib/validators";

// Validate blog data
try {
  const validData = validateBlogData(formData);
  // Use validData
} catch (error) {
  // Handle validation error
}

// Validate email
if (!validateEmail(email)) {
  throw new ValidationError("Invalid email");
}
```

## 🎨 Formatting Data

```javascript
import {
  formatDate,
  truncateText,
  stripHtml,
  formatRelativeTime,
} from "@/lib/formatters";

// Format dates
formatDate(blog.createdAt); // "January 19, 2026"
formatRelativeTime(blog.createdAt); // "2 days ago"

// Format text
truncateText(blog.content, 100); // "Lorem ipsum..."
stripHtml(blog.content); // Remove HTML tags
```

## 🛠️ Error Handling

```javascript
import { ValidationError, NotFoundError, handleApiError } from "@/lib/errors";

// Throw errors
throw new ValidationError("Invalid input");
throw new NotFoundError("Blog not found");

// Handle in API route
try {
  // ... operation
} catch (error) {
  const { error: message, statusCode } = handleApiError(error);
  return NextResponse.json({ error: message }, { status: statusCode });
}
```

## ⚙️ Configuration Usage

```javascript
import config from "@/config";

// Access config values
config.auth.jwtSecret;
config.cloudinary.cloudName;
config.api.baseUrl;
config.app.isDevelopment;
```

## 🚀 Helper Utilities

```javascript
import { debounce, retry, sleep } from "@/lib/helpers";

// Debounce search
const debouncedSearch = debounce((query) => {
  // Search logic
}, 300);

// Retry failed operations
await retry(
  async () => {
    return await fetchData();
  },
  3,
  1000,
); // 3 retries, 1 second delay

// Sleep
await sleep(2000); // Wait 2 seconds
```

## 📱 Complete Component Example

```javascript
"use client";

import React, { useState } from "react";
import { useBlogs, useDeleteBlog } from "@/hooks/useBlog";
import { formatDate, truncateText } from "@/lib/formatters";
import { toast } from "react-toastify";

export default function BlogManager() {
  const { blogs, loading, error, refetch } = useBlogs();
  const { deleteBlog, loading: deleting } = useDeleteBlog();

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted");
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.map((blog) => (
        <article key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{truncateText(blog.content, 150)}</p>
          <time>{formatDate(blog.createdAt)}</time>
          <button onClick={() => handleDelete(blog.id)} disabled={deleting}>
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}
```

---

## 💡 Pro Tips

1. **Always use hooks in components** - Don't call apiClient directly
2. **Keep services focused** - One service per domain entity
3. **Validate early** - In services, not repositories
4. **Handle errors consistently** - Use custom error classes
5. **Use configuration** - Never hardcode values
6. **Leverage formatters** - Consistent data presentation
7. **Reuse utilities** - Don't reinvent the wheel

## 📚 File Structure Checklist

When adding a new feature:

- [ ] Create service in `services/`
- [ ] Create repository in `repositories/`
- [ ] Create custom hook in `hooks/`
- [ ] Create API route in `app/api/`
- [ ] Add validation in service
- [ ] Add error handling
- [ ] Update component to use hook
- [ ] Test the feature

---

Happy coding! 🎉
