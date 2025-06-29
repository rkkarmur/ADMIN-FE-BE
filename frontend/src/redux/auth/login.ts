// src/redux/auth/login.ts
import type { AddTost } from "@components/ui/ToastProvider";
import type { AppDispatch } from "@store/index";
import { api, type LoginPayload } from "services/auth/api";
import { dispatchLoading, dispatchToast, elseHandler } from "services/auth/dispatch";
import type { LoginResponse } from "types/response/login.interface";

export const loginAPI =
	({ payload, showTost = false, addToast }: { payload: LoginPayload; showTost: boolean; addToast: AddTost }) =>
	async (dispatch: AppDispatch): Promise<void> => {
		dispatchLoading(dispatch, "auth", true);

		const response: LoginResponse = await api.login(payload);

		if (response.success) {
			dispatch({
				type: "LOGIN_SUCCESS",
				payload: response.data,
			});
			dispatchToast(dispatch, "auth", response.message);
			addToast({ type: "success", message: response.message });
		} else {
			if (showTost) {
				addToast({ type: "error", message: response.error as string });
			}
			elseHandler(dispatch, "auth", {
				message: response.message,
				error: response.error,
			});
		}
		dispatchLoading(dispatch, "auth", false);
	};
