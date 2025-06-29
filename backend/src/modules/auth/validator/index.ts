import Joi from "joi";

export const loginSchema = Joi.object({
	email: Joi.string().email().required().trim().lowercase(),
	password: Joi.string().min(6).required().trim(),
});

export const updateProfileSchema = Joi.object({
        first_name: Joi.string().min(2).optional(),
        last_name: Joi.string().min(2).optional(),
});

export const changePasswordSchema = Joi.object({
        old_password: Joi.string().min(6).required(),
        new_password: Joi.string().min(6).required(),
});
