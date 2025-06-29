import { schemaProperties } from "../common";

export const updateProfileSchema = {
        required: true,
        content: {
                "application/json": {
                        schema: {
                                type: "object",
                                properties: {
                                        first_name: schemaProperties.first_name("user"),
                                        last_name: schemaProperties.last_name("user"),
                                },
                        },
                },
                "multipart/form-data": {
                        schema: {
                                type: "object",
                                properties: {
                                        first_name: schemaProperties.first_name("user"),
                                        last_name: schemaProperties.last_name("user"),
                                },
                        },
                },
        },
};
