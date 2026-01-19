# Personal Portfolio

> A modern, modular Next.js portfolio with blog functionality

## 🏗️ Modular Architecture

This project follows a **clean, modular architecture** with enterprise-grade patterns:

- ✅ **Service Layer** - Business logic separation
- ✅ **Repository Pattern** - Database abstraction
- ✅ **Custom Hooks** - Reusable React logic
- ✅ **API Client** - Centralized HTTP communication
- ✅ **Error Handling** - Custom error classes
- ✅ **Utilities** - Validators, formatters, helpers

### 📚 Documentation

For complete documentation on the modular architecture:

- 📖 **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation guide
- 📦 **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Quick overview
- 🏗️ **[MODULAR_ARCHITECTURE.md](./MODULAR_ARCHITECTURE.md)** - Architecture benefits
- ⚡ **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Code examples

## 🚀 Tech Stack

- **Framework:** Next.js 16
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **File Upload:** Cloudinary
- **Authentication:** JWT
- **Architecture:** Modular, service-based

## 📁 Project Structure

```
src/
├── config/              # Configuration management
├── services/            # Business logic layer
├── repositories/        # Data access layer
├── hooks/              # Custom React hooks
├── lib/                # Utilities (API client, validators, formatters)
├── components/         # React components
├── app/                # Next.js app directory
└── db/                 # Database schema & migrations
```

## 🏃 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with:

   ```env
   DATABASE_URL=your_postgres_url
   JWT_SECRET=your_secret_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Run migrations:**

   ```bash
   npm run migration:migrate
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🎨 Features

- 📝 **Blog Management** - Create, edit, delete blogs
- 🔐 **Admin Dashboard** - Protected admin area
- 🖼️ **Image Upload** - Cloudinary integration
- 📱 **Responsive Design** - Mobile-friendly UI
- 🎯 **SEO Optimized** - Meta tags and OpenGraph
- ⚡ **Fast Performance** - Next.js optimization

## 💡 Usage Examples

### Using Custom Hooks

```javascript
import { useBlogs } from "@/hooks/useBlog";

function BlogList() {
  const { blogs, loading, error } = useBlogs();
  // ... render blogs
}
```

### Using Services

```javascript
import { blogService } from "@/services/blogService";

const blogs = await blogService.getAllBlogs();
```

## 📖 Learn More

- [Architecture Guide](./ARCHITECTURE.md)
- [Quick Reference](./QUICK_REFERENCE.md)
- [Migration Guide](./MIGRATION_GUIDE.md)

## 👨‍💻 Author

**Ramesh Khatri**

- Email: khatriramesh972@gmail.com
- GitHub: [@KHATRIRAMESH](https://github.com/KHATRIRAMESH)

---

Built with ❤️ using Next.js and clean architecture principles
