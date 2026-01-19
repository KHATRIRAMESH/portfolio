# ✅ Developer Checklist - Using Modular Architecture

Use this checklist when working with the modular architecture.

---

## 🆕 Creating a New Feature

### Planning Phase

- [ ] Identify which domain the feature belongs to (blog, auth, user, etc.)
- [ ] Determine if you need a new service or extend existing one
- [ ] Check if required utilities already exist
- [ ] Review similar existing features for patterns

### Implementation Phase

#### 1. Database Layer

- [ ] Add table schema to `src/db/schema.js` (if needed)
- [ ] Generate and run migration
- [ ] Test database connection

#### 2. Repository Layer

- [ ] Create repository in `src/repositories/`
- [ ] Implement CRUD methods (findAll, findById, create, update, delete)
- [ ] Add custom query methods if needed
- [ ] Use custom error classes (NotFoundError, DatabaseError)
- [ ] Export singleton instance

#### 3. Service Layer

- [ ] Create service in `src/services/`
- [ ] Implement business logic methods
- [ ] Add data validation using validators
- [ ] Use repository for data access
- [ ] Handle errors with custom error classes
- [ ] Export singleton instance

#### 4. API Routes

- [ ] Create route file in `src/app/api/`
- [ ] Import required service(s)
- [ ] Add authentication check (if needed)
- [ ] Call service methods
- [ ] Use `handleApiError()` for error responses
- [ ] Return appropriate HTTP status codes

#### 5. Custom Hooks (for client-side)

- [ ] Create hook in `src/hooks/`
- [ ] Use `apiClient` for API calls
- [ ] Return `{ data, loading, error, refetch }`
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Export hook function

#### 6. Components

- [ ] Use custom hooks (not direct API calls)
- [ ] Use formatters for data display
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Keep component focused on presentation

#### 7. Testing

- [ ] Test API endpoint with Postman/Thunder Client
- [ ] Test component in browser
- [ ] Test error scenarios
- [ ] Test loading states
- [ ] Check console for errors

#### 8. Documentation

- [ ] Add JSDoc comments to service methods
- [ ] Update README if needed
- [ ] Document any new environment variables

---

## 🔄 Refactoring Existing Code

### Before Starting

- [ ] Read [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- [ ] Identify the pattern in [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- [ ] Make a backup or commit current code
- [ ] Ensure tests are passing (if any)

### Component Refactoring

- [ ] Replace `axios` with custom hooks
- [ ] Remove local state for API data
- [ ] Replace `useEffect` for data fetching
- [ ] Use formatters instead of inline formatting
- [ ] Use utilities for common operations
- [ ] Test the component

### API Route Refactoring

- [ ] Replace direct DB access with service calls
- [ ] Use `authService` for authentication
- [ ] Use `handleApiError()` for errors
- [ ] Remove manual validation (use service)
- [ ] Test the endpoint

### Validation

- [ ] Run `npm run build` to check for errors
- [ ] Test in development mode
- [ ] Check browser console
- [ ] Check terminal for server errors

---

## 🐛 Debugging

### Component Not Loading Data

- [ ] Check browser console for errors
- [ ] Verify API endpoint is correct
- [ ] Check network tab in DevTools
- [ ] Verify hook is being used correctly
- [ ] Check if loading/error states are handled

### API Route Errors

- [ ] Check terminal for server errors
- [ ] Verify service method exists
- [ ] Check database connection
- [ ] Verify authentication token
- [ ] Check request body format

### Authentication Issues

- [ ] Verify token is in localStorage
- [ ] Check token expiration
- [ ] Verify authService is checking correctly
- [ ] Check API route has auth check
- [ ] Inspect network request headers

### Database Errors

- [ ] Check database connection
- [ ] Verify table exists
- [ ] Check schema matches code
- [ ] Verify repository method is correct
- [ ] Check for SQL errors in terminal

---

## 📦 Code Review Checklist

### Service Layer

- [ ] Business logic is in service, not repository
- [ ] Data is validated before processing
- [ ] Custom errors are thrown appropriately
- [ ] Service method names are descriptive
- [ ] JSDoc comments are present

### Repository Layer

- [ ] Only database operations (no business logic)
- [ ] Proper error handling
- [ ] Returns consistent data structure
- [ ] Uses Drizzle ORM correctly

### Custom Hooks

- [ ] Uses apiClient for API calls
- [ ] Returns loading state
- [ ] Returns error state
- [ ] Handles cleanup (if needed)
- [ ] Named appropriately (use...)

### Components

- [ ] Uses hooks, not direct API calls
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Presentation only (no business logic)
- [ ] Properly typed props (JSDoc or TS)

### API Routes

- [ ] Thin handlers (delegates to service)
- [ ] Proper authentication checks
- [ ] Consistent error handling
- [ ] Appropriate HTTP status codes
- [ ] Validates input (via service)

### General

- [ ] No hardcoded values (use config)
- [ ] Consistent naming conventions
- [ ] No console.logs in production code
- [ ] Error messages are user-friendly
- [ ] Code follows existing patterns

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Images optimized

### Environment Variables

- [ ] DATABASE_URL configured
- [ ] JWT_SECRET set (strong secret)
- [ ] Cloudinary credentials set
- [ ] All required env vars in production
- [ ] No sensitive data in code

### Performance

- [ ] Images are optimized
- [ ] API responses are quick
- [ ] No unnecessary re-renders
- [ ] Database queries optimized
- [ ] Caching implemented (if needed)

### Security

- [ ] JWT secret is strong
- [ ] Auth routes are protected
- [ ] Input is validated
- [ ] SQL injection prevented (using ORM)
- [ ] XSS prevented (sanitized HTML)

---

## 📝 Daily Development Checklist

### Starting Work

- [ ] Pull latest changes
- [ ] Install any new dependencies
- [ ] Check for migration changes
- [ ] Read recent documentation updates

### During Development

- [ ] Follow the architecture patterns
- [ ] Use existing utilities when possible
- [ ] Add JSDoc comments
- [ ] Handle errors appropriately
- [ ] Test as you code

### Before Committing

- [ ] Code builds without errors
- [ ] No console errors in browser
- [ ] Formatting is consistent
- [ ] Removed debug code
- [ ] Updated documentation (if needed)

---

## 🎯 Best Practices Reminders

### Always

- ✅ Use services in API routes
- ✅ Use hooks in components
- ✅ Validate in services
- ✅ Format data consistently
- ✅ Handle errors properly
- ✅ Use config for environment variables

### Never

- ❌ Direct database access in API routes
- ❌ Direct API calls in components
- ❌ Business logic in repositories
- ❌ Hardcoded values
- ❌ Mixed patterns (old and new)
- ❌ Ignored error states

---

## 💡 Quick Tips

1. **Copy similar code** - Don't start from scratch
2. **Use IntelliSense** - Import from `@/` aliases
3. **Check examples** - Review [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
4. **Ask for help** - Reference the documentation
5. **Test incrementally** - Don't wait until the end

---

## 🔗 Quick Links

- [Quick Reference](./QUICK_REFERENCE.md) - Code examples
- [Migration Guide](./MIGRATION_GUIDE.md) - Refactoring help
- [Architecture Guide](./ARCHITECTURE.md) - Deep dive
- [Documentation Index](./DOCUMENTATION_INDEX.md) - All docs

---

**Print this checklist or bookmark it for quick reference!** ✨
