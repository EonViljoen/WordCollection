# WordCollection
Fullstack project to capture words, group by word type, to compile a collection of words.


# Full-Stack System Checklist (Angular + ASP.NET Core + MongoDB) provided by ChatGPT on what is required for a Full-Stack System

## 1. Frontend (Client-Side)
- [x] Built with a modern framework (Angular)
- [ ] Routing system in place (Angular Router)
- [x] Consumes backend API via HttpClient
- [x] Form inputs with validation (template or reactive forms)
- [ ] Responsive design (desktop + mobile)
- [x] Uses environment variables (e.g., `environment.ts`) for config
- [x] Global error handling for failed HTTP requests

---

## 2. Backend (Server-Side)
- [x] Built with a modern backend framework (ASP.NET Core)
- [x] RESTful endpoints with correct HTTP verbs (GET, POST, PUT, DELETE)
- [x] Controllers and service layers are properly separated
- [ ] Input validation and request body checks
- [ ] Authentication (e.g., JWT)
- [ ] Authorization (e.g., role-based access)
- [x] Exception handling middleware
- [x] Environment configuration (e.g., `appsettings.json`, `.env`)

---

## 3. Database
- [x] Connected using secure, configurable connection strings
- [x] Schema or document structure well defined
- [x] Supports full CRUD operations via backend

---

## 4. API Contract & Models
- [ ] DTOs or interfaces defined for all request/response shapes
- [ ] Swagger/OpenAPI documentation auto-generated
- [ ] Consistent naming and versioning of endpoints
- [ ] Standard error response structure

---

## 5. Configuration Management
- [x] No hardcoded values (URLs, secrets, tokens)
- [x] Externalized configs per environment (dev, staging, prod)
- [x] Sensitive config stored in secrets manager or env vars

---

## 6. DevOps / CI/CD
- [x] Git repository with clean commit history
- [x] CI/CD pipeline set up (GitHub Actions / GitLab CI / Azure DevOps)
- [x] Dockerfile and docker-compose for production

---

## 7. Hosting & Deployment
- [x] Backend hosted on a cloud platform (Render)
- [x] Frontend deployed to CDN (Github Pages)
- [ ] HTTPS/SSL enabled
- [x] Deployment is automated

---

## 8. Monitoring & Logging
- [x] Logging is implemented (Serilog)
- [ ] Health check endpoint available

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