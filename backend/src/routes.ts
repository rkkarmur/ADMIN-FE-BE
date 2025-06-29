import { Router } from "express";
import { authRouter } from "./modules/auth/routes/index";
import { sessionMiddleware } from "./middleware/session";
console.log("Initializing v1Router for API versioning...");

const route = Router();

// Middleware to handle API versioning
route.use("/auth", sessionMiddleware, authRouter);

export const v1Router = route;
