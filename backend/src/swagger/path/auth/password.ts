import { authTag } from "../../tags";
import * as commonResponse from "../../commonResponse";
import { changePasswordSchema } from "../../schema/auth/changePassword";

let tags = [authTag];
export const passwordPath = {
        put: {
                tags,
                operationId: "auth-change-password",
                summary: "Change account password",
                description: "Allows the authenticated user to change the account password",
                requestBody: changePasswordSchema,
                responses: {
                        "200": commonResponse.OK,
                        "401": commonResponse.UN_AUTH(),
                        "403": commonResponse.FORBIDDEN,
                        "404": commonResponse.NOT_FOUND("User"),
                        "500": commonResponse.SERVER_ERROR,
                },
        },
};
