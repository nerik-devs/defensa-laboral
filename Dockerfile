# ============================================================================
# Multi-stage build for the Astro static site.
#
# Stage 1 ("build") has Node and compiles the site into static files (dist/).
# Stage 2 ("runtime") is a tiny nginx image that only serves those files.
# The final image contains NO Node, NO node_modules, NO source code —
# just nginx + HTML/CSS/JS. Smaller, faster, and a smaller attack surface.
# ============================================================================

# ---------------------------------------------------------------------------
# Stage 1: build
# node:24-alpine = official Node 24 (Astro needs >=22.12) on Alpine Linux
# (a ~5 MB base distro). The "AS build" name lets stage 2 reference it.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS build

# Every following instruction runs inside this directory in the image.
WORKDIR /app

# Copy ONLY the dependency manifests first. Docker caches each layer:
# as long as package*.json don't change, the expensive `npm ci` layer is
# reused on rebuilds, even when source files change. Order matters.
COPY package.json package-lock.json ./

# `npm ci` = clean, reproducible install from the lockfile (fails if the
# lockfile is out of sync, never "upgrades" anything). Always prefer it
# over `npm install` in CI/builds.
RUN npm ci

# Now copy the rest of the source. .dockerignore keeps node_modules, .git,
# dist, etc. out of the build context so this layer stays small and cache-
# friendly.
COPY . .

# Astro inlines PUBLIC_* variables at BUILD time — the value must exist here,
# not at runtime. Coolify passes env vars marked "Build Variable" as
# --build-arg, ARG receives it, and ENV exposes it to `npm run build`.
ARG PUBLIC_SINACOL_SERVER_URL
ENV PUBLIC_SINACOL_SERVER_URL=$PUBLIC_SINACOL_SERVER_URL

# Compile: astro build -> static files in /app/dist
RUN npm run build

# ---------------------------------------------------------------------------
# Stage 2: runtime
# nginx:alpine serves static files. Nothing from stage 1 survives except
# what we COPY --from=build explicitly.
# ---------------------------------------------------------------------------
FROM nginx:alpine AS runtime

# Our server config (gzip, cache headers, security headers).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The compiled site from stage 1 into nginx's web root.
COPY --from=build /app/dist /usr/share/nginx/html

# Documentation of the port nginx listens on (Coolify reads this).
EXPOSE 80

# nginx:alpine already defines the right CMD; no need to repeat it.
