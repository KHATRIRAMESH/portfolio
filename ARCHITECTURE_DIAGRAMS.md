# 📊 Architecture Diagrams

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Browser)                       │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Components  │  │  Components  │  │  Components  │         │
│  │   (Blogs)    │  │   (Admin)    │  │   (Header)   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                  │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │ Custom Hooks │                             │
│                    │  (useBlogs,  │                             │
│                    │   useAuth)   │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │  API Client  │                             │
│                    │ (Interceptors)│                             │
│                    └──────┬───────┘                             │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTP Requests
┌───────────────────────────┼─────────────────────────────────────┐
│                    ┌──────▼───────┐                             │
│                    │  API Routes  │                             │
│                    │ /api/blogs,  │                             │
│                    │ /api/auth    │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │   Services   │                             │
│                    │  Business    │                             │
│                    │    Logic     │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │ Repositories │                             │
│                    │ Data Access  │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │   Database   │                             │
│                    │  (Postgres)  │                             │
│                    └──────────────┘                             │
│                      Backend (Server)                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### Read Operation (GET /api/blogs)

```
User clicks "View Blogs"
        │
        ▼
[BlogList Component]
        │ uses
        ▼
[useBlogs() Hook]
        │ calls
        ▼
[apiClient.get('/api/blogs')]
        │ HTTP GET
        ▼
[GET /api/blogs Route]
        │ delegates
        ▼
[blogService.getAllBlogs()]
        │ calls
        ▼
[blogRepository.findAll()]
        │ queries
        ▼
[Database SELECT]
        │
        ▼
Data flows back up ⬆️
        │
        ▼
[Component renders with data]
```

### Write Operation (POST /api/blogs)

```
User submits form
        │
        ▼
[CreateBlog Component]
        │ uses
        ▼
[useCreateBlog() Hook]
        │ calls
        ▼
[apiClient.post('/api/blogs', data)]
        │ HTTP POST (with token)
        ▼
[POST /api/blogs Route]
        │ checks
        ▼
[authService.isAuthenticated()]
        │ if valid, delegates
        ▼
[blogService.createBlog(data)]
        │ validates
        ▼
[validateBlogData(data)]
        │ if valid, calls
        ▼
[blogRepository.create(data)]
        │ inserts
        ▼
[Database INSERT]
        │
        ▼
New blog returned ⬆️
        │
        ▼
[Component shows success]
```

## 📦 Module Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                        Components                            │
│  (No business logic, only presentation)                      │
└────────────────────────┬────────────────────────────────────┘
                         │ depends on
┌────────────────────────▼────────────────────────────────────┐
│                      Custom Hooks                            │
│  (React state management, API calls)                         │
└────────────────────────┬────────────────────────────────────┘
                         │ depends on
┌────────────────────────▼────────────────────────────────────┐
│                      API Client                              │
│  (HTTP communication, token management)                      │
└─────────────────────────────────────────────────────────────┘

                    Server Side ↓

┌─────────────────────────────────────────────────────────────┐
│                      API Routes                              │
│  (Request handling, response formatting)                     │
└────────────────────────┬────────────────────────────────────┘
                         │ depends on
┌────────────────────────▼────────────────────────────────────┐
│                       Services                               │
│  (Business logic, validation, orchestration)                 │
└──────┬──────────────────────────────────────┬───────────────┘
       │                                       │
       │ uses                                  │ uses
       ▼                                       ▼
┌──────────────┐                      ┌──────────────────┐
│ Repositories │                      │   Validators     │
│              │                      │   Formatters     │
└──────┬───────┘                      │   Helpers        │
       │                              └──────────────────┘
       │ queries
       ▼
┌──────────────┐
│   Database   │
└──────────────┘
```

## 🎯 Service Layer Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       Service Layer                           │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐         │
│  │   Auth     │  │   Blog     │  │  Cloudinary    │         │
│  │  Service   │  │  Service   │  │    Service     │         │
│  └─────┬──────┘  └─────┬──────┘  └────────┬───────┘         │
│        │               │                   │                  │
│        │ Uses          │ Uses              │ Uses             │
│        ▼               ▼                   ▼                  │
│  ┌─────────┐     ┌──────────┐      ┌──────────┐            │
│  │  JWT    │     │   Blog   │      │Cloudinary│            │
│  │ Utils   │     │   Repo   │      │   SDK    │            │
│  └─────────┘     └──────────┘      └──────────┘            │
│                                                               │
│  All services use:                                           │
│  • Validators (for input validation)                         │
│  • Error Classes (for consistent errors)                     │
│  • Config (for settings)                                     │
└──────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                      Login Process                            │
└──────────────────────────────────────────────────────────────┘

User enters credentials
        │
        ▼
[LoginForm Component]
        │ uses
        ▼
[useAuth().login(username, password)]
        │ calls
        ▼
[apiClient.post('/api/auth/login', {username, password})]
        │
        ▼
[POST /api/auth/login]
        │ calls
        ▼
[authService.validateLogin(username, password)]
        │ if valid
        ▼
[authService.signToken({username, role})]
        │
        ▼
Returns JWT token
        │
        ▼
[Hook saves to localStorage]
        │
        ▼
[Updates auth state]

┌──────────────────────────────────────────────────────────────┐
│                   Protected Request                           │
└──────────────────────────────────────────────────────────────┘

User makes protected request
        │
        ▼
[Component uses hook]
        │
        ▼
[apiClient adds token from localStorage]
        │ Authorization: Bearer <token>
        ▼
[Protected API Route]
        │ checks
        ▼
[authService.isAuthenticated(request)]
        │ extracts & verifies token
        ▼
[authService.verifyToken(token)]
        │ if valid
        ▼
[Process request]
```

## 🛠️ Utility Organization

```
┌──────────────────────────────────────────────────────────────┐
│                      lib/ (Utilities)                         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ apiClient.js                                         │    │
│  │ • HTTP methods (GET, POST, PUT, DELETE)             │    │
│  │ • Request interceptor (add token)                   │    │
│  │ • Response interceptor (handle errors)              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ errors.js                                            │    │
│  │ • AppError, ValidationError, NotFoundError          │    │
│  │ • AuthenticationError, AuthorizationError           │    │
│  │ • handleApiError(), formatErrorForClient()          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ validators.js                                        │    │
│  │ • validateBlogData()                                │    │
│  │ • validateEmail()                                   │    │
│  │ • validatePassword()                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ formatters.js                                        │    │
│  │ • formatDate(), formatRelativeTime()                │    │
│  │ • truncateText(), stripHtml()                       │    │
│  │ • formatFileSize(), slugify()                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ helpers.js                                           │    │
│  │ • debounce(), throttle(), retry()                   │    │
│  │ • deepClone(), groupBy(), pick(), omit()            │    │
│  │ • sleep(), generateId()                             │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

## 📁 File Organization

```
src/
│
├── config/
│   └── index.js ─────────────┐
│                              │
├── services/                  │
│   ├── authService.js ────────┼─── Uses config
│   ├── blogService.js ────────┤
│   └── cloudinaryService.js ──┘
│
├── repositories/
│   └── blogRepository.js ─────┐
│                               │
├── hooks/                      ├─── Use services
│   ├── useAuth.js ─────────────┤     via API Client
│   └── useBlog.js ─────────────┘
│
├── lib/
│   ├── apiClient.js ──────────┐
│   ├── errors.js              │
│   ├── validators.js          ├─── Shared utilities
│   ├── formatters.js          │
│   └── helpers.js ─────────────┘
│
├── components/
│   └── */
│       └── Component.js ──────┐
│                               ├─── Use hooks
├── app/                        │
│   ├── page.js ────────────────┤
│   └── */                      │
│       └── page.js ────────────┘
│
└── app/api/
    └── */
        └── route.js ──────────┐
                                ├─── Use services
                                └─── directly
```

## 🎨 Color Legend

```
🟢 Green: Data Layer (Database, Repositories)
🔵 Blue: Business Layer (Services, Validation)
🟡 Yellow: Application Layer (API Routes, Hooks)
🟣 Purple: Presentation Layer (Components)
🔴 Red: Utilities (Config, Helpers, Formatters)
```

---

## 💡 Key Principles Illustrated

1. **Unidirectional Data Flow**: Data flows down from database through layers
2. **Separation of Concerns**: Each layer has distinct responsibility
3. **Dependency Inversion**: Upper layers depend on abstractions (services)
4. **Single Responsibility**: Each module does one thing well
5. **DRY Principle**: Reusable utilities, hooks, and services

---

These diagrams illustrate how the modular architecture creates a clean, maintainable, and scalable codebase! 🎉
