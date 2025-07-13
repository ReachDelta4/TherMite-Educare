import type { Express } from "express";
import { storage } from "./storage";

export function configureRoutes(app: Express): void {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Example route stub
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });
}
