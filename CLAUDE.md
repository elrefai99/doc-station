# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs server + BullMQ worker concurrently)
pnpm dev              # Linux/Mac
pnpm dev:windows      # Windows

# Build & Production
pnpm build            # TypeScript compile
pnpm start            # Run via PM2

# Linting & Type-checking
pnpm lint

# Testing
pnpm test             # Jest (all tests)
pnpm test:local       # Development test run

# Database
pnpm seed             # Seed base data
pnpm seed:city        # Seed city data
pnpm seed:all         # Run all seeds
pnpm visualize        # Schema visualization at http://localhost:4000

# Dependency management
pnpm taze:local       # Check outdated deps
pnpm taze:update      # Update deps interactively
pnpm taze:patch       # Patch-only updates
```

## Architecture

**Doc-Station** is a healthcare platform backend (orthopedic surgery domain) — a single Node.js/Express application with two PM2 processes: the API server and a BullMQ worker.

### Stack

- **Runtime:** Node.js 22, TypeScript 5.9.3
- **Framework:** Express.js 5.x
- **ORM:** Prisma 7.x with PostgreSQL
- **Queue:** BullMQ + Redis
- **Real-time:** Socket.IO
- **Storage:** Cloudinary + Sharp (image processing)
- **Email:** Nodemailer via BullMQ queue jobs
- **Auth:** JWT (access + refresh + pending tokens) + bcrypt
- **API Docs:** Swagger UI at `/api-docs`

### Module Structure

All features live under `src/modules/`. Each module follows this pattern:

```
src/modules/<Feature>/
  *.module.ts         # Express Router (route definitions + middleware)
  *.controller.ts     # Barrel re-exporting controller functions
  Controller/         # Individual route handlers
  DTO/                # Request validation (class-validator)
  shared/             # Module-specific utilities
  *.swagger.ts        # OpenAPI annotations
```

Modules: `authentication`, `User`, `Booking`, `products`, `OTP`, `search`, `chat`

Routes are registered in `src/app.module.ts`, all prefixed `/api/v1/`.

### Authentication & Authorization

- **JWT Strategy:** Three token types — `ACCESS`, `REFRESH`, `PENDING` (pending = awaiting OTP verification)
- **Role-based middleware** in `src/middleware/authentication/`: `userMiddleware`, `patientMiddleware`, `doctorMiddleware`, `adminMiddleware`, `activeMiddleware`, `pendingMiddleware`
- Tokens validated via `src/utils/JWT/`
- User roles: `ADMIN`, `PATIENT`, `DOCTOR`
- User statuses: `ACTIVE`, `INACTIVE`, `VERIFIED`, `BANNED`, `SUSPENDED`, `DELETED`, `ARCHIVED`

### Background Jobs

BullMQ worker runs as a separate process (`src/Queue/worker.ts`). Email jobs are queued from controllers and processed by `src/Queue/Emails/`. Redis is the queue backend.

### WebSocket (Socket.IO)

Handlers in `src/socket/`. Supports real-time chat, typing indicators, and message read receipts. JWT authentication required for socket connections.

### Error Handling Pattern

Controllers use `asyncHandler` wrapper (`src/utils/asyncHandler.utils.ts`). Throw `ServerError` (`src/utils/api.errors.utils.ts`) for standardized error responses.

### Configuration

- Environment loaded via `src/config/dotenv.conf.ts`
- Prisma client: `src/config/prisma.ts`
- Redis client: `src/config/redis.ts`
- Cloudinary client: `src/config/cloudinary.ts`
- Use `.env` for local, `.env.dev` for development overrides

### Key Environment Variables

```
DATABASE_URL            # PostgreSQL connection string
REDIS_HOST              # Redis connection URL
ACCESS_TOKEN_SECRET     # JWT access token secret
REFRESH_TOKEN_SECRET    # JWT refresh token secret
PENDING_TOKEN_SECRET    # JWT pending user token secret
CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
PAYMOB_* / APS_*        # Payment gateway credentials
```

### Deployment

- **Docker:** `docker-compose.yml` (production) / `docker-compose.dev.yml` (development)
- **Kubernetes:** manifests in `/k8s/` (namespace, app, redis, nginx deployments)
- **Nginx:** reverse proxy on port 80 → app on port 9000, WebSocket-compatible
- **CI:** GitHub Actions in `.github/workflows/check.yml` runs build verification on every push
