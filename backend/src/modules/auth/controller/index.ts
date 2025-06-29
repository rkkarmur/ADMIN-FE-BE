import { Request, Response } from "express";
import * as AuthService from "../service/index";
import { responseSender } from "../../../helper/resFormate";
import { AppError } from "../../../helper/appError";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const result = await AuthService.login(email, password);
		// Save token in session
		req.session.token = result?.token;
		req.session.tz = "UTC";
		await responseSender(req, res, 200, true, "AUTH_LOGIN_SUCCESS", result);
		return;
	} catch (error: any) {
		if (error instanceof AppError) {
			await responseSender(req, res, error.statusCode, false, error.message, {}, {});
			return;
		}
		console.error("❌ Server error:", error);

		await responseSender(req, res, 500, false, "SERVER_ERROR", {}, error);
		return;
	}
};

export const getProfile = async (req: Request, res: Response) => {
	try {
                const tokenData = req.tokenData as any;
		const user = await AuthService.getProfile(tokenData?.id);
		responseSender(req, res, 200, true, "AUTH_PROFILE_GET_SUCCESS", user);
		return;
	} catch (error) {
		if (error instanceof AppError) {
			await responseSender(req, res, error.statusCode, false, error.message, {}, {});
			return;
		}
		console.error("❌ Server error:", error);

		await responseSender(req, res, 500, false, "SERVER_ERROR", {}, error);
		return;
	}
};

export const updateProfile = async (req: Request, res: Response) => {
	try {
                const tokenData = req.tokenData as any;
		const { first_name, last_name } = req.body;
		const user = await AuthService.updateProfile(tokenData.id, {
			first_name,
			last_name,
		});
		await responseSender(req, res, 200, true, "PROFILE_UPDATE_SUCCESS", user);
	} catch (error: any) {
		if (error instanceof AppError) {
			await responseSender(req, res, error.statusCode, false, error.message, {}, {});
			return;
		}
		console.error("❌ Server error:", error);
		await responseSender(req, res, 500, false, "SERVER_ERROR", {}, error);
	}
};

export const changePassword = async (req: Request, res: Response) => {
	try {
                const tokenData = req.tokenData as any;
		const { old_password, new_password } = req.body;
		await AuthService.changePassword(tokenData.id, old_password, new_password);
		await responseSender(req, res, 200, true, "PASSWORD_CHANGE_SUCCESS");
	} catch (error: any) {
		if (error instanceof AppError) {
			await responseSender(req, res, error.statusCode, false, error.message, {}, {});
			return;
		}
		console.error("❌ Server error:", error);
		await responseSender(req, res, 500, false, "SERVER_ERROR", {}, error);
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
                const tokenData = req.tokenData as any;
		await AuthService.logout(tokenData.id);
		req.session.destroy(() => {});
		await responseSender(req, res, 200, true, "AUTH_LOGOUT_SUCCESS");
		return;
	} catch (error: any) {
		if (error instanceof AppError) {
			await responseSender(req, res, error.statusCode, false, error.message, {}, {});
			return;
		}
		console.error("❌ Server error:", error);
		await responseSender(req, res, 500, false, "SERVER_ERROR", {}, error);
		return;
	}
};
