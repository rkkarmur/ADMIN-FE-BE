// Auth Reducer Types
export interface User {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	role: { id: string; name: string; slug: string; permission?: { name: string; access?: string[] }[] };
	is_active: number;
	last_login: string;
	business: string;
}
interface AuthState {
	isLoggedIn: boolean;

	user?: User; // You can replace `any` with a more specific type if available
}

interface LoginSuccessAction {
	type: "LOGIN_SUCCESS";
	payload: User;
}

interface ProfileSuccessAction {
	type: "PROFILE_SUCCESS";
	payload: User;
}

interface LogoutSuccessAction {
	type: "LOGOUT_SUCCESS";
}

type AuthAction = LoginSuccessAction | LogoutSuccessAction | ProfileSuccessAction;

export const authReducer = (
	state: AuthState = {
		isLoggedIn: false,

		user: undefined,
	},
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				isLoggedIn: true,
				user: action.payload,
			};

		case "PROFILE_SUCCESS":
			return {
				isLoggedIn: true,
				user: action.payload,
			};

		case "LOGOUT_SUCCESS":
			return {
				isLoggedIn: false,
				user: undefined,
			};

		default:
			return state;
	}
};
export interface Auth {
	auth: AuthState;
}
