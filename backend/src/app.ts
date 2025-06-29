import express from "express";
import { serve, setup } from "swagger-ui-express";
import i18n from "./middleware/i18n";
import basicAuth from "express-basic-auth";

import { corsMiddleware } from "./middleware/cors";
import { v1Router } from "./routes";
import { swaggerJson } from "./swagger";

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS
app.use(corsMiddleware);
// Middleware for localization (i18n) can be added here if needed
app.use(i18n.init);
//swagger

const IS_DEV = false;
const alias = 1 === 1 ? "v1" : "v1";
const docsRout = IS_DEV ? "/api-docs" : `/${alias}/api-docs`;
const users = { ["user"]: "password" };
const authMiddleware = basicAuth({
	users,
	challenge: true, // Show the login dialog
	unauthorizedResponse: "Unauthorized", // Error message for unauthorized users
});

app.use(docsRout, serve);
app.get(docsRout, authMiddleware, setup(1 === 1 ? swaggerJson : swaggerJson));
//add base route /api/v1
app.use("/api/v1", v1Router);
// Add other module routers here

export const appServer = app;
