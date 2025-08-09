# --- Production Node.js backend (plain JS) ---
FROM node:18-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install only production deps (fast, small image)
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Copy app source
COPY . .

EXPOSE 3000
# Your app reads DATABASE_URL at runtime
CMD ["node", "index.js"]
