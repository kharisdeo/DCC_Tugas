# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-slim AS base

# Vite app lives here
WORKDIR /var/www/html

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=10.12.1
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base AS build
WORKDIR /var/www/html

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY . .

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final image stage
FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    nodejs \
    npm \
    netcat-traditional

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy application files
COPY . /var/www/html

# Install dependencies and build assets
RUN composer install --no-interaction --no-plugins --no-scripts
COPY --from=build /var/www/html/node_modules /var/www/html/node_modules
COPY --from=build /var/www/html/public/ /var/www/html/public/
COPY --from=build /var/www/html/public/build /var/www/html/public/build
COPY --from=build /var/www/html/public/build/manifest.json /var/www/html/public/build/manifest.json

EXPOSE 9000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]