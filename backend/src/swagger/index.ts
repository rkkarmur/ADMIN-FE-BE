import { env } from "../config/env";
import { authPath } from "./path/auth";
import { tags } from "./tags";

const servers = [
	{
		url: `http://localhost:${env?.PORT}` + "/api/v1",
		description: "Local server",
	},
];

export const swaggerJson = {
	openapi: "3.0.3",
	swagger: "2.0.0.",
	info: {
		title: "My Project API",
		description: "This is the API documentation for My Project.",
		version: "1.0.0",
	},

	servers: servers,
	security: [
		{
			ApiKeyAuth: [],
		},
	],

	tags: tags,
	paths: {
		...authPath,
	},
	components: {
		securitySchemes: {
			// ApiKeyAuth: {
			// 	type: "apiKey",
			// 	name: "Api-Key",
			// 	in: "header",
			// 	description: "Provide your API key here. Example: `" + configuration.apiKey + "`"
			// }
			// BearerAuth: {
			// 	type: "http",
			// 	scheme: "bearer",
			// 	bearerFormat: "JWT"
			// }
		},
	},
};
