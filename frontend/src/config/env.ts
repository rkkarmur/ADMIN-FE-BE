import Joi from "joi";

const envSchema = Joi.object({
	VITE_ALIAS: Joi.string().default(""),
	VITE_API_URL: Joi.string().uri().required(),
	VITE_OTHER_KEY: Joi.string().optional(),
}).unknown(true); // allow extra env vars

// Validate `import.meta.env`
const { error, value: envVars } = envSchema.validate(import.meta.env, {
	abortEarly: false,
});

if (error) {
	console.error("❌ Invalid environment variables:", error.details);
	throw new Error("Invalid environment variables");
}

export const ENV = {
	ALIAS: envVars.VITE_ALIAS,
	API_URL: envVars.VITE_API_URL,
	OTHER_KEY: envVars.VITE_OTHER_KEY,
};
