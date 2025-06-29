import { Request, Response } from "express";
export const responseSender = async (req: Request, res: Response, status_code: number, success: boolean, messageTag: string, data?: any, error?: any, replacements = {}) => {
	return res.status(status_code).json({ success, status_code: status_code, message: req.__(messageTag), data, error });
};
