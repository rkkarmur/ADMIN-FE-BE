import { authTag } from "../../tags";
import * as commonResponse from "../../commonResponse";

let tags = [authTag];
export const logoutPath = {
        post: {
                tags,
                operationId: "auth-logout",
                summary: "Logout user",
                description: "Logs out the currently authenticated user",
                responses: {
                        "200": commonResponse.OK,
                        "401": commonResponse.UN_AUTH(),
                        "403": commonResponse.FORBIDDEN,
                        "404": commonResponse.NOT_FOUND("User"),
                        "500": commonResponse.SERVER_ERROR,
                },
        },
};
