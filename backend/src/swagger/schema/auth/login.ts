import { schemaProperties } from "../common";

export const loginSchema = {
	required: true,
	content: {
		"application/json": {
			schema: {
				type: "object",
				properties: {
					email: schemaProperties.email,
					password: schemaProperties.password,
				},
				required: ["email", "password"],
			},
		},
		"multipart/form-data": {
			schema: {
				type: "object",
				properties: {
					email: schemaProperties.email,
					password: schemaProperties.password,
				},
				required: ["email", "password"],
			},
		},
	},
};
