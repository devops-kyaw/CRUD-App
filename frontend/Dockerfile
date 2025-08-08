# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /test
COPY package*.json ./  # Copy package files first for better caching
RUN npm install             # Install all dependencies
COPY . .               # Then copy source code
RUN npm run build      # Build the application

# Stage 2: Production image with minimal footprint
FROM node:18-alpine
WORKDIR /app
# Only copy built assets and production dependencies
COPY --from=builder /test/dist ./dist
COPY --from=builder /test/package*.json ./
RUN npm ci --production  # Install only production dependencies
CMD ["node", "dist/server.js"]  # Run the built application