// src/services/auth/dispatch.ts

import type { AppDispatch } from "@store/index";

interface Data {
	message: string;
	error: unknown;
}

// Dispatch loading state
export const dispatchLoading = (dispatch: AppDispatch, scope: string, status: boolean) => {
	dispatch({
		type: "SET_LOADING",
		payload: { scope, status },
	});
};

// Dispatch toast message
export const dispatchToast = (dispatch: AppDispatch, scope: string, status: boolean | string) => {
	dispatch({
		type: "SET_TOAST",
		payload: { scope, status },
	});
};

// Dispatch error state
export const dispatchError = (dispatch: AppDispatch, scope: string, status: unknown) => {
	dispatch({
		type: "SET_ERROR",
		payload: { scope, status },
	});
};

// Handle unknown errors (fallback)
export const elseHandler = (dispatch: AppDispatch, scope: string, data: Data) => {
	dispatchToast(dispatch, "error", data?.message);
	dispatchError(dispatch, scope, data?.error);
};
