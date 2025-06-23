## Local Development

1. Install dependencies:
    ```bash
    pnpm install
    ```
2. Start the development database:
    - If you have Postgres installed locally, start your local database.
    - Or, to use Docker Compose for the dev database, run:
      ```bash
      docker compose -f compose.dev.yml up -d
      ```
    The default dev database credentials are: user `root`, password `mysecretpassword`, db `local` (see `compose.dev.yml`).
3. Generate Drizzle schema types:
    ```bash
    pnpm db:generate
    ```
4. Update the database schema:
    ```bash
    pnpm run db:push
    ```
5. Start the development server:
    ```bash
    pnpm run dev
    ```
6. Visit the `/demo/lucia` route to view the Lucia demo.

---

## Production Deployment (with Docker)

1. Set the `DATABASE_URL` environment variable to point to your production database.
2. Build the Docker image, passing the `DATABASE_URL` as a build argument if needed:
    ```bash
    docker build --build-arg DATABASE_URL=your_database_url -t my-svelte-app .
    ```
3. Run the Docker container:
    ```bash
    docker run -p 3000:3000 --env DATABASE_URL=your_database_url my-svelte-app
    ```
4. The application will be available at [http://localhost:3000](http://localhost:3000).

> **Note:** You can use your preferred container orchestration or process manager as needed.

---

## Deployment with Docker Compose

- Use `compose.yml` for production-like deployments (includes both app and Postgres database with production credentials).
- Use `compose.dev.yml` for local development database only.

### Full Stack (App + DB) with Docker Compose

1. Copy `.env.example` to `.env` and set the `DATABASE_URL` variable if needed, or use the default values in `compose.yml`.
2. Start the application and database with Docker Compose:
    ```bash
    docker compose up --build
    ```
    This uses `compose.yml` (default: user `svelte`, password `svelte`, db `svelte`).
3. The app will be available at [http://localhost:3000](http://localhost:3000).
4. The Postgres database will be available at port 5432.
5. To stop and remove containers, networks, and volumes:
    ```bash
    docker compose down -v
    ```

### Development Database Only (Optional)

If you only want to run the database for local development:
```bash
docker compose -f compose.dev.yml up -d
```

---

**After starting any new database (dev or prod), always run:**
```bash
pnpm db:generate
pnpm run db:push
```
To ensure your schema and types are up to date.
