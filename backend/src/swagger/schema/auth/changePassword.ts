import { schemaProperties } from "../common";

export const changePasswordSchema = {
        required: true,
        content: {
                "application/json": {
                        schema: {
                                type: "object",
                                properties: {
                                        old_password: schemaProperties.password,
                                        new_password: schemaProperties.password,
                                },
                                required: ["old_password", "new_password"],
                        },
                },
                "multipart/form-data": {
                        schema: {
                                type: "object",
                                properties: {
                                        old_password: schemaProperties.password,
                                        new_password: schemaProperties.password,
                                },
                                required: ["old_password", "new_password"],
                        },
                },
        },
};
