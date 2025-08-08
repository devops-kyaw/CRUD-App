# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies (frozen lockfile)
RUN npm Install

# Copy application source code
COPY . .

# ---------- Stage 2: Production ----------
FROM node:18-alpine

WORKDIR /app

# Copy only the node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the app files
COPY --from=builder /app ./

# Use JSON array form for CMD (recommended)
CMD ["node", "App.js"]

# Expose port (change if your app uses a different one)
EXPOSE 3000
