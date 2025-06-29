import type { AddTost } from "@components/ui/ToastProvider";
import type { AppDispatch } from "@store/index";
import { api } from "services/auth/api";
import { dispatchLoading, elseHandler } from "services/auth/dispatch";

export interface ChangePasswordPayload {
    old_password: string;
    new_password: string;
}

export const changePasswordAPI =
    ({ payload, addToast }: { payload: ChangePasswordPayload; addToast: AddTost }) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        dispatchLoading(dispatch, "auth", true);
        const response = await api.changePassword(payload);
        if (response.success) {
            addToast({ type: "success", message: response.message || "Password changed" });
        } else {
            addToast({ type: "error", message: String(response.error || response.message) });
            elseHandler(dispatch, "auth", {
                message: response.message || "Error",
                error: response.error,
            });
        }
        dispatchLoading(dispatch, "auth", false);
        return !!response.success;
    };
