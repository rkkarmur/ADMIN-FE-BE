import { schemaProperties } from "../../schema/common";
import * as commonResponse from "../../commonResponse";
import { authTag } from "../../tags";
import { loginSchema } from "../../schema/auth/login";

let tags = [authTag];
export const loginPath = {
	post: {
		tags,
		operationId: "auth-login",
		summary: "Login a user into the system",
		description: "Authenticates a user by email and password and returns an authorization token with user basic info",
		requestBody: loginSchema,
		responses: {
			"200": commonResponse.OK,
			"401": commonResponse.UN_AUTH(),
			"403": commonResponse.FORBIDDEN,
			"404": commonResponse.NOT_FOUND("User"),
			"500": commonResponse.SERVER_ERROR,
		},
	},
};
