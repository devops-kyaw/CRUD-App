// backend/index.js
const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });
const app = express();
app.use(express.json());

// Simple async wrapper to catch errors in route handlers
const asyncH = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Health check (includes optional DB ping)
app.get(
  "/healthz",
  asyncH(async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ status: "ok", db: "up" });
    } catch {
      res.status(503).json({ status: "degraded", db: "down" });
    }
  })
);

// Get all users
app.get(
  "/users",
  asyncH(async (_req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  })
);

// Add a new user
app.post(
  "/users",
  asyncH(async (req, res) => {
    const { name } = req.body || {};
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Invalid 'name'." });
    }
    const { rows } = await pool.query(
      "INSERT INTO users(name) VALUES($1) RETURNING *",
      [name.trim()]
    );
    res.status(201).json(rows[0]);
  })
);

// 404 handler
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server only after verifying DB connectivity
(async () => {
  try {
    await pool.query("SELECT 1");
    const server = app.listen(PORT, () =>
      console.log(`Backend running on port ${PORT}`)
    );

    // Graceful shutdown
    const shutdown = async (sig) => {
      console.log(`\nReceived ${sig}. Shutting down gracefully...`);
      server.close(async () => {
        await pool.end().catch(() => {});
        process.exit(0);
      });
      // Force exit if not closed in time
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (e) {
    console.error("Failed to connect to the database on startup:", e.message);
    process.exit(1);
  }
})();
