# Docker Configuration

This directory contains Docker configuration files for the EGYStay project. Below is a description of all Docker-related files in the project, including those in this directory and the project root.

## Docker Directory Files

### `docker-compose.mongo.yml`
*   **Purpose**: Sets up the MongoDB database service.
*   **Image**: `mongo:8`
*   **Port**: `27017`
*   **Environment Variables**: Configures root username (`lesoll`) and password.
*   **Volumes**: Persists data to the `mongo_data` volume.

### `docker-compose.redis.yml`
*   **Purpose**: Sets up a standalone Redis cache service.
*   **Image**: `redis:7-alpine`
*   **Port**: `6379`
*   **Volumes**: Persists data to the `redis_data` volume.

## Root Docker Files

### `Dockerfile`
*   **Purpose**: Production Docker image definition.
*   **Base Image**: `node:22`
*   **Steps**: Installs dependencies, copies source code, builds the application (`npm run build`), and starts the server (`npm start`).
*   **Exposed Port**: `9000`

### `Dockerfile.dev`
*   **Purpose**: Development Docker image definition.
*   **Base Image**: `node:22-alpine`
*   **Steps**: Installs additional system dependencies (Python, Make, GCC, Cairo, etc.) required for native modules, installs npm dependencies, and runs the development server (`npm run dev`).
*   **Exposed Port**: `9000`

### `docker-compose.yml`
*   **Purpose**: Orchestrates the **production** environment.
*   **Services**:
    *   `app`: Builds from `Dockerfile`, loads `.env`, sets `NODE_ENV=production`.
    *   `redis`: Runs a Redis instance for the application to connect to.
*   **Dependencies**: The app ensures Redis is started before running.

### `docker-compose.dev.yml`
*   **Purpose**: Orchestrates the **development** environment.
*   **Services**:
    *   `app`: Builds from `Dockerfile.dev`, loads `.env.dev`, sets `NODE_ENV=development`.
    *   `redis`: Runs a Redis instance.
*   **Features**: Designed for development workflows with hot-reloading (via `npm run dev` in the Dockerfile).
