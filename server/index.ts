import express from "express";
import { createLogger } from "vite";
import { configureRoutes } from "./routes";
import { configureVite, setupVite } from "./vite";
import { createServer } from "http";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 5000;
const logger = createLogger();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureRoutes(app);

// Create HTTP server
const server = createServer(app);

async function startServer() {
  try {
    if (process.env.NODE_ENV === "development") {
      // In development, setup Vite dev server
      await setupVite(app, server);
      logger.info("Vite middleware configured");
    } else {
      // In production, serve static files
      const distPath = path.resolve(process.cwd(), "dist/public");
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        
        // Serve index.html for all non-API routes
        app.get("*", (req, res) => {
          if (!req.path.startsWith("/api")) {
            res.sendFile(path.join(distPath, "index.html"));
          }
        });
      }
    }

    server.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
}

startServer();
