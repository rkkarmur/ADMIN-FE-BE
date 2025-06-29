import type { AddTost } from "@components/ui/ToastProvider";
import type { AppDispatch } from "@store/index";
import { api } from "services/auth/api";
import { dispatchLoading, elseHandler } from "services/auth/dispatch";

interface ApiResponse {
    success?: boolean;
    message?: string;
    data?: unknown;
    user?: unknown;
    error?: unknown;
}

export const profileAPI =
    ({ showToast = false, addToast }: { showToast?: boolean; addToast?: AddTost }) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatchLoading(dispatch, "auth", true);
        const response: ApiResponse = await api.profile();
        const success = response.success !== false;
        if (success) {
            dispatch({
                type: "PROFILE_SUCCESS",
                payload: response.data ?? response.user ?? response,
            });
            if (showToast && addToast) {
                addToast({ type: "success", message: response.message ?? "Profile loaded" });
            }
        } else {
            if (showToast && addToast) {
                addToast({ type: "error", message: String(response.error) });
            }
            elseHandler(dispatch, "auth", {
                message: response.message || "Error",
                error: response.error,
            });
        }
        dispatchLoading(dispatch, "auth", false);
    };
