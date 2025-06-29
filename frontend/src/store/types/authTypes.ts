export interface AuthState {
	isLoggedIn: boolean;
	user?: { _id: number; name: string; email: string; role?: { name: string } };
}

// Action Types
export const AUTH_LOAD_SUCCESS = "AUTH_LOAD_SUCCESS" as const;
export const AUTH_LOAD_FAILURE = "AUTH_LOAD_FAILURE" as const;
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS" as const;
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS" as const;

export interface AuthLoadSuccessAction {
        type: typeof AUTH_LOAD_SUCCESS;
        payload: unknown;
}

export interface AuthLoadFailureAction {
        type: typeof AUTH_LOAD_FAILURE;
}

export interface AuthLoginSuccessAction {
        type: typeof AUTH_LOGIN_SUCCESS;
        payload: unknown;
}

export interface AuthLogoutSuccessAction {
        type: typeof AUTH_LOGOUT_SUCCESS;
}

export type AuthAction = AuthLoadSuccessAction | AuthLoadFailureAction | AuthLoginSuccessAction | AuthLogoutSuccessAction;
