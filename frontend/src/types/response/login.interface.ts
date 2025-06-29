export interface LoginResponse {
	success: boolean;
	status_code: number;
	message: string;
	data?: {
		_id: string;
		email: string;
		first_name: string;
		last_name: string;
		role: string;
		is_active: number;
		last_login: string;
		// token: string;
	};
	error: unknown;
}
