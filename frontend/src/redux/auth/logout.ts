import type { AddTost } from "@components/ui/ToastProvider";
import type { AppDispatch } from "@store/index";
import { api } from "services/auth/api";
import { dispatchLoading } from "services/auth/dispatch";

export const logoutAPI =
    ({ addToast }: { addToast?: AddTost } = {}) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatchLoading(dispatch, "auth", true);
        try {
            await api.logout();
            dispatch({ type: "LOGOUT_SUCCESS" });
            if (addToast) {
                addToast({ type: "success", message: "Logged out successfully" });
            }
        } catch (err) {
            if (addToast) {
                addToast({ type: "error", message: (err as Error).message });
            }
        } finally {
            dispatchLoading(dispatch, "auth", false);
        }
    };
