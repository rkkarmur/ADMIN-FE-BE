import type { AddTost } from "@components/ui/ToastProvider";
import type { AppDispatch } from "@store/index";
import { api } from "services/auth/api";
import { dispatchLoading, elseHandler } from "services/auth/dispatch";

export interface UpdateProfilePayload {
    first_name: string;
    last_name: string;
}

export const updateProfileAPI =
    ({ payload, addToast }: { payload: UpdateProfilePayload; addToast: AddTost }) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatchLoading(dispatch, "auth", true);
        const response = await api.updateProfile(payload);
        if (response.success) {
            dispatch({ type: "PROFILE_SUCCESS", payload: response.data });
            addToast({ type: "success", message: response.message || "Profile updated" });
        } else {
            addToast({ type: "error", message: String(response.error || response.message) });
            elseHandler(dispatch, "auth", {
                message: response.message || "Error",
                error: response.error,
            });
        }
        dispatchLoading(dispatch, "auth", false);
    };
