import { authTag } from "../../tags";
import * as commonResponse from "../../commonResponse";
import { updateProfileSchema } from "../../schema/auth/updateProfile";

let tags = [authTag];
export const profilePath = {
        get: {
                tags,
                operationId: "auth-get-profile",
                summary: "Get authenticated user's profile",
                description: "Retrieves the profile of the logged-in user",
                responses: {
                        "200": commonResponse.OK,
                        "401": commonResponse.UN_AUTH(),
                        "403": commonResponse.FORBIDDEN,
                        "404": commonResponse.NOT_FOUND("User"),
                        "500": commonResponse.SERVER_ERROR,
                },
        },
        put: {
                tags,
                operationId: "auth-update-profile",
                summary: "Update profile",
                description: "Updates the authenticated user's profile details",
                requestBody: updateProfileSchema,
                responses: {
                        "200": commonResponse.OK,
                        "401": commonResponse.UN_AUTH(),
                        "403": commonResponse.FORBIDDEN,
                        "404": commonResponse.NOT_FOUND("User"),
                        "500": commonResponse.SERVER_ERROR,
                },
        },
};
