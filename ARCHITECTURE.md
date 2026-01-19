# Modular Development Architecture

This document outlines the modular development approach implemented in this portfolio project.

## 📁 Project Structure

```
src/
├── config/              # Configuration management
│   └── index.js        # Centralized app configuration
│
├── services/           # Business logic layer
│   ├── authService.js      # Authentication logic
│   ├── blogService.js      # Blog business logic
│   └── cloudinaryService.js # Image upload logic
│
├── repositories/       # Data access layer
│   └── blogRepository.js   # Database operations for blogs
│
├── hooks/             # Custom React hooks
│   ├── useAuth.js         # Authentication hooks
│   └── useBlog.js         # Blog-related hooks
│
├── lib/               # Utility libraries
│   ├── apiClient.js       # Centralized HTTP client
│   ├── auth.js            # Legacy auth (backward compatibility)
│   ├── errors.js          # Custom error classes
│   ├── validators.js      # Data validation utilities
│   ├── formatters.js      # Data formatting utilities
│   └── helpers.js         # General helper functions
│
├── components/        # React components
├── app/              # Next.js app directory
├── actions/          # Server actions
├── db/               # Database configuration
└── constants/        # App constants
```

## 🏗️ Architecture Layers

### 1. Configuration Layer (`config/`)

- Centralizes all environment variables and app settings
- Single source of truth for configuration
- Type-safe configuration access

**Usage:**

```javascript
import config from "@/config";
console.log(config.auth.jwtSecret);
```

### 2. Service Layer (`services/`)

- Contains business logic
- Validates data before processing
- Coordinates between repositories and other services
- Keeps API routes thin and focused

**Services:**

- `authService`: Authentication, JWT operations, password hashing
- `blogService`: Blog CRUD operations with validation
- `cloudinaryService`: File upload/delete operations

**Usage:**

```javascript
import { blogService } from "@/services/blogService";
const blogs = await blogService.getAllBlogs();
```

### 3. Repository Layer (`repositories/`)

- Abstracts database operations
- Single responsibility: data access only
- No business logic
- Throws custom errors for better error handling

**Usage:**

```javascript
import { blogRepository } from "@/repositories/blogRepository";
const blog = await blogRepository.findById(id);
```

### 4. Custom Hooks Layer (`hooks/`)

- Reusable React logic
- Encapsulates API calls and state management
- Provides loading, error, and data states
- Makes components cleaner

**Available Hooks:**

- `useBlogs()`: Fetch all blogs
- `useBlog(id)`: Fetch single blog
- `useCreateBlog()`: Create blog
- `useUpdateBlog()`: Update blog
- `useDeleteBlog()`: Delete blog
- `useAuth()`: Authentication state
- `useRequireAuth()`: Route protection

**Usage:**

```javascript
import { useBlogs } from "@/hooks/useBlog";

function BlogList() {
  const { blogs, loading, error } = useBlogs();
  // ...
}
```

### 5. Utilities Layer (`lib/`)

#### API Client (`apiClient.js`)

- Centralized HTTP client built on axios
- Automatic token injection
- Global error handling
- Request/response interceptors

**Usage:**

```javascript
import { apiClient } from "@/lib/apiClient";
const data = await apiClient.get("/api/blogs");
```

#### Error Handling (`errors.js`)

- Custom error classes for different scenarios
- Consistent error formatting
- Operational vs programming errors

**Custom Errors:**

- `AppError`: Base error class
- `ValidationError`: Input validation failures
- `AuthenticationError`: Auth failures
- `AuthorizationError`: Permission issues
- `NotFoundError`: Resource not found
- `DatabaseError`: Database operation failures

**Usage:**

```javascript
import { ValidationError, handleApiError } from "@/lib/errors";

throw new ValidationError("Invalid email format");
```

#### Validators (`validators.js`)

- Input validation functions
- Data sanitization
- Consistent validation rules

**Usage:**

```javascript
import { validateBlogData } from "@/lib/validators";
const validData = validateBlogData(rawData);
```

#### Formatters (`formatters.js`)

- Date formatting
- Text manipulation
- Consistent data presentation

**Usage:**

```javascript
import { formatDate, truncateText } from "@/lib/formatters";
const formatted = formatDate(blog.createdAt);
```

#### Helpers (`helpers.js`)

- General utility functions
- Debounce, throttle, retry logic
- Object/array manipulation

**Usage:**

```javascript
import { debounce, retry } from "@/lib/helpers";
const debouncedSearch = debounce(search, 300);
```

## 🔄 Data Flow

### 1. Reading Data (GET)

```
Component
  ↓ (uses hook)
Custom Hook (useBlog)
  ↓ (calls)
API Client
  ↓ (HTTP request)
API Route
  ↓ (calls)
Service Layer (blogService)
  ↓ (calls)
Repository Layer (blogRepository)
  ↓ (queries)
Database
```

### 2. Writing Data (POST/PUT)

```
Component
  ↓ (uses hook)
Custom Hook (useCreateBlog)
  ↓ (calls)
API Client
  ↓ (HTTP request with token)
API Route (checks auth)
  ↓ (calls)
Service Layer (validates data)
  ↓ (calls)
Repository Layer
  ↓ (inserts/updates)
Database
```

## ✅ Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Reusability**: Services, hooks, and utilities can be reused across the app
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Changes are isolated to specific layers
5. **Scalability**: Easy to add new features without breaking existing code
6. **Type Safety**: Better error handling and validation
7. **DRY Principle**: No code duplication

## 🚀 Usage Examples

### Creating a New Blog

```javascript
import { useCreateBlog } from "@/hooks/useBlog";

function CreateBlogForm() {
  const { createBlog, loading, error } = useCreateBlog();

  const handleSubmit = async (data) => {
    try {
      await createBlog(data);
      // Success!
    } catch (err) {
      // Error handled by hook
    }
  };
}
```

### Protected Route

```javascript
import { useRequireAuth } from "@/hooks/useAuth";

function AdminPage() {
  const { isAuthenticated, loading } = useRequireAuth();

  if (loading) return <Loading />;

  return <AdminContent />;
}
```

### API Route with Error Handling

```javascript
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

## 🔧 Future Enhancements

1. Add TypeScript for better type safety
2. Implement caching layer (Redis)
3. Add pagination to repository layer
4. Create middleware for common operations
5. Add logging service
6. Implement rate limiting
7. Add unit and integration tests

## 📚 Best Practices

1. **Always use services in API routes** - Don't access repositories directly
2. **Use custom hooks in components** - Don't call API directly
3. **Validate data in services** - Not in API routes
4. **Handle errors consistently** - Use custom error classes
5. **Keep components thin** - Move logic to hooks or services
6. **Use configuration module** - Don't hardcode values
7. **Write self-documenting code** - Use clear names and comments

---

This modular architecture provides a solid foundation for scaling the application while maintaining clean, maintainable, and testable code.
