## Local Development

1. **Install dependencies:**
    ```bash
    pnpm install
    composer install
    ```
2. **Copy environment file and set up keys:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
3. **Start the development database:**
    - If you have MySQL installed locally, start your local database.
    - Or, to use Docker Compose for the dev database, run:
      ```bash
      docker compose up -d db redis
      ```
    The default dev database credentials are set in your `.env` file and `compose.yml`.
4. **Run database migrations and seeders:**
    ```bash
    php artisan migrate --seed
    ```
5. **Start the development servers:**
    ```bash
    pnpm run dev
    php artisan serve
    ```
    Or, to run all services (Laravel, Vite, queue, logs) concurrently:
    ```bash
    composer run dev
    ```
6. **Visit the app:**
    - Laravel API: [http://localhost:8000](http://localhost:8000)
    - Vite/React frontend: [http://localhost:5173](http://localhost:5173)

---

## Production Deployment (with Docker)

1. **Set environment variables** in your `.env` file for production (DB, Redis, etc).
2. **Build the Docker image:**
    ```bash
    docker compose build
    ```
3. **Start all services:**
    ```bash
    docker compose up -d
    ```
4. **The app will be available at:**
    - Nginx: [http://localhost:8080](http://localhost:8080)
    - MySQL: port 3306
    - Redis: port 6379

5. **To stop and remove containers, networks, and volumes:**
    ```bash
    docker compose down -v
    ```

---

## File & Service Overview

### Docker & Compose
- **Dockerfile**: Multi-stage build for Node (Vite/React) and PHP (Laravel). Installs dependencies, builds assets, and prepares a production-ready PHP-FPM container.
- **compose.yml**: Defines services for `app` (PHP/Laravel), `db` (MySQL), `webserver` (Nginx), and `redis`. Handles networking, volumes, and environment variables.
- **.docker/**: Contains custom config files for PHP (`php-local.ini`) and Nginx (`nginx.conf`).

### Laravel & Node
- **composer.json**: PHP dependencies (Laravel, Inertia, etc.), dev tools (Pest, Pint, Sail), and scripts for development and testing.
- **package.json**: Node dependencies for React, Vite, Tailwind, ESLint, Prettier, etc. Scripts for building, linting, formatting, and running the frontend.

---

## Common Commands

- **Install PHP dependencies:**
    ```bash
    composer install
    ```
- **Install Node dependencies:**
    ```bash
    pnpm install
    ```
- **Run all dev services (concurrently):**
    ```bash
    composer run dev
    ```
- **Run tests:**
    ```bash
    composer test
    ```
- **Build frontend assets:**
    ```bash
    pnpm run build
    ```

---

## Notes
- The default database, user, and password are set via environment variables in `.env` and referenced in `compose.yml`.
- For production, always review and secure your `.env` and Docker secrets.
- For more details, see the comments in `Dockerfile` and `compose.yml`.
