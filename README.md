# WordCollection
Fullstack project to capture words, group by word type, to compile a collection of words.

# Prerequisites for local environment
- Angular 18 / 19
- .Net 8 (ASP.NET CORE)
- MongoDB

# Hosting
- GitHub Pages for Frontend
- Render for Backend
- Mongo Atlas for Database

# Live Site URL
- https://eonviljoen.github.io/WordCollection/

# Full-Stack System Checklist (Angular + ASP.NET Core + MongoDB) provided by ChatGPT on what is required for a Full-Stack System

## 1. Frontend (Client-Side)
- [x] Built with a modern framework
- [x] Routing system in place
- [x] Components for listing, creating, editing, deleting words
- [x] Consumes backend API via HttpClient
- [x] All endpoints pulled from config
- [x] Form inputs with validation
- [x] Material Design or custom styling applied
- [x] Responsive design
- [x] Custom error handling and feedback
- [x] Uses environment variables (e.g., `environment.ts`) for config
- [x] Global error handling for failed HTTP requests

---

## 2. Backend (Server-Side)
- [x] Built with a modern backend framework
- [x] RESTful endpoints with correct HTTP verbs
- [x] Controllers and service layers are properly separated
- [x] DTO models
- [x] Services for database interaction
- [x] Input validation and request body checks
- [ ] ~Authentication (e.g., JWT)~
- [x] Authorization (e.g., role-based access)
- [x] CORS policy enabled for frontend domain
- [x] Exception handling middleware
- [x] Environment configuration

---

## 3. Database
- [x] Connected using secure, configurable connection strings
- [x] Schema or document structure well defined
- [x] Supports full CRUD operations via backend
- [ ] ~Data migration or seed setup~

---

## 4. API Contract & Models
- [x] DTOs or interfaces defined for all request/response shapes
- [x] RESTful endpoints follow conventions
- [x] Uses proper status codes
- [x] Swagger/OpenAPI documentation auto-generated
- [x] Consistent naming and versioning of endpoints
- [x] Angular calls endpoints using service layer, no hardcoded URLs
- [x] Standard error response structure

---

## 5. Configuration Management
- [x] No hardcoded values (URLs, secrets, tokens)
- [x] Externalized configs per environment (dev, staging, prod)
- [x] Sensitive config stored in secrets manager or env vars

---

## 6. DevOps / CI/CD
- [x] Git repository with clean commit history
- [x] GitHub Actions workflow:
  - [x] Build Angular app
  - [x] Build .NET Core backend
  - [ ] ~Run tests~
  - [x] Dockerize both apps
  - [x] Push to DockerHub/GitHub Container Registry
- [x] Dockerfile and docker-compose for production
- [ ] ~Linting and formatting integrated in pipeline~
- [ ] ~Tests executed during CI~
- [ ] ~Dockerfile and docker-compose for local~
- [x] Dockerfile and docker-compose for production

---

## 7. Hosting & Deployment
- [x] Backend hosted on a cloud platform
- [x] Frontend deployed to CDN
- [x] MongoDB hosted on Atlas
- [x] HTTPS/SSL enabled
- [ ] ~Custom domain set~
- [x] Deployment is automated

---

## 8. Monitoring & Logging
- [x] Backend logs requests/responses
- [ ] ~Frontend logs errors~
- [x] Centralized or external logging
- [x] Error tracking enabled
- [ ] ~Health check endpoint available~
- [ ] ~Performance monitoring~

---

## 9. Testing & Quality
- [ ] Unit tests for backend services in .NET using xUnit or NUnit
- [ ] Unit/component tests for frontend with Karma/Jasmine
- [ ] E2E tests with tools like Cypress or Playwright
- [ ] ~Code coverage reported (optional)~
- [ ] ESLint/TSLint, Prettier configured

---

## 10. Documentation
- [x] `README.md` with project overview, setup instructions, and architecture
- [ ] ~API documentation available (e.g., Swagger UI)~
- [ ] ~Architecture diagram (optional)~
- [ ] ~Environment variable reference~
- [ ] ~Developer guide or onboarding doc (optional)~

## 11. Bonus (Enterprise / Production-Level)
- [x] Mobile-friendly (PWA or mobile-first design)
- [x] Internationalization (i18n) support
- [ ] ~Multi-environment deployment (dev/staging/prod)~
- [x] Role-based admin dashboard
- [ ] ~Email or notification system~
