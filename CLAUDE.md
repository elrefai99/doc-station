# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs server + BullMQ worker concurrently)
pnpm dev              # Linux/Mac (sets NODE_ENV=development)
pnpm dev:windows      # Windows

# Build & Production
pnpm build            # tsc → dist/ (run `prisma generate` first; see gotchas below)
pnpm start            # Runs compiled server + worker via concurrently (node dist/...)

# Linting & Type-checking
pnpm lint             # eslint .

# Testing
pnpm test             # Jest (--detectOpenHandles --runInBand)
pnpm test:local       # NODE_ENV=development jest

# Database (Prisma)
npx prisma generate   # Regenerate client into src/generated/prisma (REQUIRED before build/run)
npx prisma migrate deploy
pnpm seed             # Seed governorates
pnpm seed:city        # Seed cities
pnpm seed:all         # Run all seeds (also wired as `prisma db seed`)
pnpm visualize        # Schema visualization at http://localhost:4000

# Dependency management (see PNPM Catalogs note)
pnpm taze:local       # Check outdated deps
pnpm taze:update      # Update deps (major, write)
pnpm taze:patch       # Patch-only updates
```

There is currently **no test suite checked in** — Jest is configured but no `*.test.ts` files exist under `src/`.

## Architecture

**Doc-Station** is a healthcare platform backend (orthopedic surgery domain) — a single Node.js/Express application that runs as **two processes**: the API server (`src/app.ts`) and a BullMQ worker (`src/Queue/worker.ts`). Both are launched together by `pnpm dev` / `pnpm start`, and as two PM2 apps via `ecosystem.config.js` (used inside Docker).

### Stack

- **Runtime:** Node.js 22, TypeScript 5.9.3
- **Framework:** Express.js 5.x
- **ORM:** Prisma 7.x with PostgreSQL via the **`@prisma/adapter-pg` driver adapter** (a `pg` Pool, not Prisma's default engine) — see `src/config/prisma.ts`. Prisma config lives in `prisma.config.ts`.
- **Queue:** BullMQ + Redis
- **Real-time:** Socket.IO
- **Storage:** Cloudinary + Sharp (image processing)
- **Email:** Nodemailer via BullMQ queue jobs (legacy SendGrid helper still present under `src/Queue/shared/`)
- **Auth:** JWT (access + refresh + pending tokens) + bcrypt
- **API Docs:** Swagger UI at `/api-docs`

### Build / runtime gotchas

- **Prisma client output is custom.** The client is generated into `src/generated/prisma` (set in `prisma/schema.prisma`'s `generator` block) and imported as `../generated/prisma`, *not* `@prisma/client`. Always run `npx prisma generate` after schema changes or a fresh checkout, before `pnpm build` or running anything.
- **Server port** defaults to `9999` (`process.env.PORT`). Nginx proxies to the app; README's `3000`/`9000` are aspirational.
- **Env file is chosen by `NODE_ENV`:** `.env.dev` when `NODE_ENV=development`, otherwise `.env` (`src/config/dotenv.conf.ts`).
- **Body limit is 75mb** and static assets are served from `cdn/` at `/v0/public` (`src/app.config.ts`).

### PNPM Catalogs

This repo is a `pnpm-workspace.yaml` workspace using **dependency catalogs**. In `package.json`, versions are written as `catalog:<group>` (e.g. `"express": "catalog:core"`); the real versions live in the `catalogs:` section of `pnpm-workspace.yaml`. To add or bump a dependency, update the catalog entry there — editing the `package.json` version string alone will not work.

### Module Structure

All HTTP features live under `src/modules/`. Each module follows this pattern:

```
src/modules/<Feature>/
  *.module.ts         # Express Router (route definitions + middleware)
  *.controller.ts     # Barrel re-exporting controller functions
  Controller/         # Individual route handlers (one file per handler)
  DTO/                # Request validation (class-validator)
  shared/             # Module-specific utilities
  *.swagger.ts        # OpenAPI annotations
```

HTTP modules are registered in `src/app.module.ts`, each mounted under `/api/v1/`:

| Prefix             | Module          |
|--------------------|-----------------|
| `/api/v1/auth`     | authentication  |
| `/api/v1/user`     | User            |
| `/api/v1/otp`      | OTP             |
| `/api/v1/search`   | search          |
| `/api/v1/booking`  | Booking         |
| `/api/v1/product`  | products        |

The **`chat` module is Socket.IO-only** — it has controllers under `src/modules/chat/` but is *not* mounted in `app.module.ts`. Real-time chat is wired through `src/socket/`.

### Request flow

`src/app.ts` → `src/app.config.ts` (helmet, cors allow-list, rate-limit, morgan, body parsing, a middleware setting `req.lang`/`req.clientIP`) → `src/app.module.ts` (mounts module routers) → Swagger. The HTTP server is wrapped by Socket.IO in `app.ts`, which exports the shared `ioSocket` instance.

### Authentication & Authorization

- **JWT Strategy:** Three token types — `ACCESS`, `REFRESH`, `PENDING` (pending = awaiting OTP verification). Helpers in `src/utils/JWT/`.
- **Role vs UserType:** Prisma has two separate enums — `Role` (`USER`, `ADMIN`) and `UserType` (`DOCTOR`, `PATIENT`). A doctor/patient is a `USER` role with the corresponding `UserType`; `ADMIN` is a role.
- **Role/status middleware** in `src/middleware/authentication/`: `userMiddleware`, `patientMiddleware` (file `patieny.middleware.ts`), `doctorMiddleware`, `adminMiddleware`, `activeMiddleware`, `pendingMiddleware`, plus `socket.middleware.ts` for Socket.IO auth.

### Background Jobs

The BullMQ worker is a **separate process** (`src/Queue/worker.ts`). Email jobs are queued from controllers (`src/Queue/Emails/queue.email.ts`) and processed by the worker (`src/Queue/Emails/`). Redis is the queue backend.

### WebSocket (Socket.IO)

Handlers in `src/socket/` (chat, notifications, typing, read receipts, room-join hooks under `src/socket/hooks/`). JWT authentication is required for socket connections (`socket.middleware.ts`).

### Error Handling Pattern

Controllers are wrapped with `asyncHandler` (`src/utils/asyncHandler.utils.ts`; `asyncSocketHandler` for socket handlers). Throw `ServerError(message, statusCode)` (`src/utils/api.errors.utils.ts`) for standardized error responses — `status` resolves to `"Error"` for 4xx, `"Fail"` otherwise.

### Caching

Redis-backed caching utilities live in `src/Common/shared/Redis/` (`cache.service.fun.ts`, `cache.invalidation.ts`).

### Configuration

- Env loaded via `src/config/dotenv.conf.ts`
- Prisma client: `src/config/prisma.ts` (pg driver adapter)
- Redis client: `src/config/redis.ts`
- Cloudinary client: `src/config/cloudinary.ts`

### Key Environment Variables

```
DATABASE_URL                                          # PostgreSQL connection string
REDIS_HOST                                            # Redis connection
ACCESS_TOKEN_SECRET / REFRESH_TOKEN_SECRET / PENDING_TOKEN_SECRET
CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
PAYMOB_* / APS_*                                      # Payment gateways (Paymob = patient bookings, APS/Amazon = doctor equipment rental)
SITE_URL_* / APS_*_LINK                               # CORS allow-list origins (src/app.config.ts)
PORT                                                  # Defaults to 9999
```

### Deployment

- **Docker:** `docker-compose.yml` (production) / `docker-compose.dev.yml` (development); runtime uses PM2 (`ecosystem.config.js`).
- **Kubernetes:** manifests in `/k8s/` (namespace, app, redis, nginx).
- **Nginx:** WebSocket-compatible reverse proxy.
- **CI:** GitHub Actions in `.github/workflows/` (`check.yml` build verification, `notify.discord.yml`).
