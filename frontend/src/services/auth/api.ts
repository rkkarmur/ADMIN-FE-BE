//src\services\auth\api.ts
import axios, { AxiosError } from "axios";
import { ENV } from "@config/env";
import { API_ENDPOINTS } from "@config/api";
import type { LoginResponse } from "types/response/login.interface";

const axiosInstance = axios.create({
	baseURL: ENV.API_URL,
	withCredentials: true, // for session-based auth (cookies)
	headers: {
		"Content-Type": "application/json",
	},
});

export interface GenericResponse {
	success?: boolean;
	status_code?: number;
	message?: string;
	data?: unknown;
	error?: unknown;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface ProfileResponse {
	user: unknown;
}

export const api = {
	login: async (data: LoginPayload): Promise<LoginResponse> => {
		try {
			const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message?: string; error?: unknown }>;

			return {
				success: false,
				status_code: error.response?.status || 502,
				message: error.response?.data?.message || "Unable to connect service",
				// data: {}, // or null if you prefer
				error: error.response?.data?.error || error.message,
			};
		}
	},

	logout: async (): Promise<void> => {
		await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
	},

	profile: async (): Promise<ProfileResponse> => {
		const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
		return response.data;
	},

	updateProfile: async (data: { first_name: string; last_name: string }): Promise<GenericResponse> => {
		try {
			const response = await axiosInstance.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message?: string; error?: unknown }>;
			return {
				success: false,
				status_code: error.response?.status || 502,
				message: error.response?.data?.message || "Unable to connect service",
				error: error.response?.data?.error || error.message,
			};
		}
	},

	changePassword: async (data: { old_password: string; new_password: string }): Promise<GenericResponse> => {
		try {
			const response = await axiosInstance.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message?: string; error?: unknown }>;
			return {
				success: false,
				status_code: error.response?.status || 502,
				message: error.response?.data?.message || "Unable to connect service",
				error: error.response?.data?.error || error.message,
			};
		}
	},
};
