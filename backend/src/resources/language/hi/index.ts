const msg = {
	// ✅ Common
	SUCCESS: "Success.",
	OK: "OK",
	CREATED: "Created successfully.",
	VALIDATION_ERROR: "Validation error.",
	SERVER_ERROR: "Server error.",
	INTERNAL_SERVER_ERROR: "Internal server error.",
	DB_FAULT: "Problem occurred with the database.",
	UNAUTHORIZED: "Unauthorized user.",
	FORBIDDEN: "You do not have permission to access this resource.",
	NOT_FOUND: "Data not found.",
	NO_DATA_FOUND: "Data not found.",
	ALREADY_EXIST: "{{field}} already exists.",
	DUPLICATED_DATA: "Data duplicated.",
	TOO_MANY_REQUESTS: "Too many requests, please try again after a few minutes.",

	// ✅ Token & Auth Errors
	INVALID_TOKEN: "Invalid token.",
	TOKEN_EXPIRED: "Token has expired.",
	TOKEN_PREDATED: "Wrong token.",
	TOKEN_INACTIVE: "Token is inactive.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	NOT_REGISTERED: "User not registered.",

	// ✅ Auth
	AUTH_MISSING_ACCESS_KEY: "Missing APIs access key.",
	AUTH_INVALID_ACCESS_KEY: "Invalid APIs access key.",
	AUTH_MISSING_AUTH: "Missing authorization.",
	AUTH_UN_AUTH: "You are not authorized.",
	AUTH_TOKEN_STORE_FAIL: "Unable to store your token.",
	AUTH_LOGIN_SUCCESS: "Login successful.",
	AUTH_LOGOUT_SUCCESS: "Logout successful.",
	AUTH_LOGOUT_FAILURE: "Unable to logout.",
	AUTH_FORGOT_PASSWORD_SUCCESS: "Password reset link has been sent to your email successfully.",
	AUTH_RESET_PASSWORD_LINK_EXPIRED: "Password reset link has expired. Try with a new link.",
	AUTH_RESET_PASSWORD_SUCCESS: "Password has been reset successfully.",
	AUTH_RESET_PASSWORD_FAIL: "Unable to update your password.",
	AUTH_INVALID_CREDENTIAL: "Please enter correct email and password.",
	AUTH_TOKEN_DIS: "Token disregarded.",
	AUTH_ACCOUNT_REMOVED: "Account removed successfully.",
	AUTH_PASSWORD_UPDATE: "Account password updated successfully.",
	AUTH_OLD_PASSWORD_INCORRECT: "Old password is incorrect.",
	AUTH_FCM_STORED: "FCM token stored.",

	// ✅ OTP
	OTP_SENT_SUCCESSFULLY: "OTP sent successfully.",
	OTP_INVALID: "OTP not valid.",
	OTP_EXPIRED: "OTP has expired.",

	// ✅ User
	USER_DELETED_BY_ADMIN: "Your account has been deleted by admin.",
	USER_DELETE_SUCCESS: "User deleted successfully.",
	USER_DELETE_FAILURE: "User deletion failed.",
	USER_RESTORE_SUCCESS: "User restored successfully.",
	USER_RESTORE_FAILURE: "User restoration failed.",
	USER_NOT_FOUND: "No such user found.",
	ACCOUNT_NOT_EXIST: "Account does not exist.",
	NOT_REGISTER: "You have not registered yet. Please register.",
	EMAIL_EXIST: "This email is already registered.",
	PROFILE_UPDATE_SUCCESS: "Profile updated successfully.",
	PROFILE_UPDATE_FAILURE: "Profile update failed.",
	PROFILE_FOUND_SUCCESS: "User profile found successfully.",
	PROFILE_PICTURE_UPDATE_SUCCESS: "Image uploaded successfully.",
	REGISTER_SUCCESS: "You have been registered successfully.",
	REGISTERED_SUCCESSFULLY: "Registered successfully.",
	LOGOUT_SUCCESSFUL: "Log out successful.",
	LOGIN_SUCCESSFUL: "Login successful.",
        PASSWORD_RESET_SUCCESSFULLY: "Password reset successfully.",
        PASSWORD_CHANGE_SUCCESS: "Password changed successfully.",
        GET_USER_DETAILS_SUCCESS: "Details retrieved successfully.",
	USER_SUBSCRIPTION_NON: "You do not have an active subscription plan. Please subscribe to access this feature.",

	// ✅ Data
	DATA_ADD_SUCCESS: "Data added successfully.",
	DATA_UPDATE_SUCCESS: "Data updated successfully.",
	DATA_UPDATED_SUCCESSFULLY: "Data updated successfully.",
	DATA_DELETED_SUCCESS: "Data deleted successfully.",
	DATA_DELETED_SUCCESSFULLY: "Data deleted successfully.",
	DATA_RESTORE_SUCCESS: "Data restored successfully.",
	DATA_RESTORED_SUCCESSFULLY: "Data restored successfully.",
	DATA_FOUND_SUCCESS: "Data found successfully.",
	DATA_RETRIEVED: "Data retrieved successfully.",
	DATA_INSERT_SUCCESS: "Data inserted successfully.",
	DATA_ALREADY_EXISTS: "This data already exists.",

	// ✅ Role
	ROLE_NOT_FOUND: "No such role found.",
	ROLE_ADD_SUCCESS: "Role added successfully.",
	ROLE_UPDATE_SUCCESS: "Role updated successfully.",
	ROLE_DELETED_SUCCESS: "Role deleted successfully.",
	ROLE_RESTORE_SUCCESS: "Role restored successfully.",
	ROLE_FOUND_SUCCESS: "Role found successfully.",
	ROLE_INSERT_SUCCESS: "Role inserted successfully.",
	ROLE_ALREADY_EXISTS: "This role already exists.",

	// ✅ Server-side Validation
	fieldRequired: "Field is required.",
	fieldNotEmpty: "Field cannot be empty.",
	fieldIsNumber: "Field should be a valid number.",
	fieldIsString: "Field should be a string.",
	fieldIsEmail: "Enter a valid email address.",
	fieldIsBoolean: "Field should be a boolean.",
	fieldIsFloat: "Field should be a float.",
	fieldIsObject: "Field should be an object.",
	IS_OBJECTID: "Field should be a valid ObjectId.",
	fieldIsURL: "Enter a valid URL.",
	fieldIsDate: "Field should be in date format (YYYY-MM-DD).",
	fieldInValid: "Enter a valid value.",
	invalidValues: "Enter a valid value.",
	fieldIsMobileNumber: "Enter a valid mobile number.",
	fieldStrongPassword: "Enter a strong password.",
	fieldStrongPasswordWithRestriction: "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
	fieldMinLength1: "Field should be an array with minimum length 1.",
	fieldIsArray: "Field should be an array.",
	invalidTimeZone: "Field should be a valid time zone.",
};

export default msg;
