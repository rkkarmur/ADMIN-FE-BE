import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { responseSender } from "./resFormate";

/**
 * Middleware to validate request body using Joi schema.
 * @param schema Joi object schema
 * @returns Express middleware function
 */
export const validateBody = (schema: ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			responseSender(req, res, 403, false, "VALIDATION_ERROR", {}, error.details);
		}
		next();
	};
};
