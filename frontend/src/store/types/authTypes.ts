export interface AuthState {
	isLoggedIn: boolean;
	user?: { _id: number; name: string; email: string; role?: { name: string } };
}

// Action Types
export interface AuthLoadSuccessAction {
	type: "AUTH_LOAD_SUCCESS";
	payload: any;
}

export interface AuthLoadFailureAction {
	type: "AUTH_LOAD_FAILURE";
}

export interface AuthLoginSuccessAction {
	type: "AUTH_LOGIN_SUCCESS";
	payload: any;
}

export interface AuthLogoutSuccessAction {
	type: "AUTH_LOGOUT_SUCCESS";
}

export type AuthAction = AuthLoadSuccessAction | AuthLoadFailureAction | AuthLoginSuccessAction | AuthLogoutSuccessAction;
