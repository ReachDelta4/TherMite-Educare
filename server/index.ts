import express from "express";
import { createLogger } from "vite";
import { configureRoutes } from "./routes";
import { configureVite, setupVite } from "./vite";
import { createServer } from "http";

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
