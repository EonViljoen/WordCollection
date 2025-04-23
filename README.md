# WordCollection
Fullstack project to capture words, group by word type, to compile a collection of words.


# Full-Stack System Checklist (Angular + ASP.NET Core + MongoDB) provided by ChatGPT on what is required for a Full-Stack System

## 1. Frontend (Client-Side)
- [ ] Built with a modern framework (Angular / React / Vue)
- [ ] Routing system in place (e.g., Angular Router)
- [ ] Consumes backend API via HttpClient or fetch
- [ ] Form inputs with validation (template or reactive forms)
- [ ] Responsive design (desktop + mobile)
- [ ] Uses environment variables (e.g., `environment.ts`) for config
- [ ] Global error handling for failed HTTP requests

---

## 2. Backend (Server-Side)
- [ ] Built with a modern backend framework (ASP.NET Core, Node.js, Django, etc.)
- [ ] RESTful endpoints with correct HTTP verbs (GET, POST, PUT, DELETE)
- [ ] Controllers and service layers are properly separated
- [ ] Input validation and request body checks
- [ ] Authentication (e.g., JWT)
- [ ] Authorization (e.g., role-based access)
- [ ] Exception handling middleware
- [ ] Environment configuration (e.g., `appsettings.json`, `.env`)

---

## 3. Database
- [ ] Connected using secure, configurable connection strings
- [ ] Schema or document structure well defined
- [ ] Supports full CRUD operations via backend
- [ ] Uses indexes, constraints, or schema validation
- [ ] Data migration or seed setup (if applicable)

---

## 4. API Contract & Models
- [ ] DTOs or interfaces defined for all request/response shapes
- [ ] Swagger/OpenAPI documentation auto-generated
- [ ] Consistent naming and versioning of endpoints
- [ ] Standard error response structure

---

## 5. Configuration Management
- [ ] No hardcoded values (URLs, secrets, tokens)
- [ ] Externalized configs per environment (dev, staging, prod)
- [ ] Sensitive config stored in secrets manager or env vars

---

## 6. DevOps / CI/CD
- [ ] Git repository with clean commit history
- [ ] CI/CD pipeline set up (GitHub Actions / GitLab CI / Azure DevOps)
- [ ] Linting and formatting integrated in pipeline
- [ ] Tests executed during CI
- [ ] Dockerfile and docker-compose for local and production
- [ ] Frontend and backend can run in containers independently

---

## 7. Hosting & Deployment
- [ ] Backend hosted on a cloud platform (Azure, Render, etc.)
- [ ] Frontend deployed to CDN (Netlify, Vercel, Firebase Hosting)
- [ ] HTTPS/SSL enabled
- [ ] Custom domain set (optional but preferred)
- [ ] Deployment is automated or well-documented

---

## 8. Monitoring & Logging
- [ ] Logging is implemented (Serilog, Winston, etc.)
- [ ] Centralized or external logging (optional)
- [ ] Error tracking enabled (e.g., Sentry, Application Insights)
- [ ] Health check endpoint available
- [ ] Performance monitoring (optional)

---

## 9. Testing & Quality
- [ ] Unit tests for backend services
- [ ] Unit/component tests for frontend
- [ ] E2E tests with tools like Cypress or Playwright (optional)
- [ ] Code coverage reported (optional)
- [ ] ESLint/TSLint, Prettier configured

---

## 10. Documentation
- [ ] `README.md` with project overview, setup instructions, and architecture
- [ ] API documentation available (e.g., Swagger UI)
- [ ] Architecture diagram (optional)
- [ ] Environment variable reference
- [ ] Developer guide or onboarding doc (optional)

---

## 11. Bonus (Enterprise / Production-Level)
- [ ] Mobile-friendly (PWA or mobile-first design)
- [ ] Internationalization (i18n) support
- [ ] Multi-environment deployment (dev/staging/prod)
- [ ] Role-based admin dashboard
- [ ] Email or notification system