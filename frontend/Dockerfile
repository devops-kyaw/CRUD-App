# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /test
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image with minimal footprint
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /test/dist ./dist
COPY --from=builder /test/package*.json ./
RUN npm ci --production
CMD ["node", "dist/server.js"]