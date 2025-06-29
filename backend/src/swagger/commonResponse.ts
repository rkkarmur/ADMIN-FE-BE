export const OK = {
	description: "successful",
	content: {
		"application/json": {
			schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						example: true
					},
					status_code: {
						type: "number",
						example: 200
					},
					message: {
						type: "string",
						example: "success message"
					},
					data: {
						type: "object"
					}
				}
			}
		}
	}
};
export const SUCCESS = ({ status = 200, msg = "Success message.", example = {} }) => {
	return {
		description: "successful",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							example: true
						},
						status_code: {
							type: "number",
							example: 200
						},
						message: {
							type: "string",
							example: msg
						},
						data: {
							type: "object",
							example: example
						}
					}
				}
			}
		}
	};
};
export const FORBIDDEN = {
	description: "Validation Error",
	content: {
		"application/json": {
			schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						example: false
					},
					status_code: {
						type: "number", // Change to 'number' since status_code is typically a number
						example: 403
					},
					message: {
						type: "string",
						example: "validation error."
					},
					data: {
						type: "object",
						example: {} // Explicitly show that data is an empty object
					},
					error: {
						type: "array",
						items: {
							type: "object",
							properties: {
								type: {
									type: "string",
									example: "field"
								},
								message: {
									// Corrected from 'message' to 'message'
									type: "string",
									example: "Must be valid value."
								},
								path: {
									type: "string",
									example: "id"
								},
								location: {
									type: "string",
									example: "query",
									enum: ["query", "body"]
								},
								value: {
									type: "string",
									example: "0"
								}
							}
						}
					}
				}
			}
		}
	}
};

export const NOT_FOUND = (name: string) => {
	return {
		description: name + " not found.",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							example: false
						},
						status_code: {
							type: "number",
							example: 404
						},
						message: {
							type: "string",
							example: "Data not found message."
						}
					}
				}
			}
		}
	};
};

export const SERVER_ERROR = {
	description: "server error",
	content: {
		"application/json": {
			schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						example: false
					},
					status_code: {
						type: "boolean",
						example: 500
					},
					message: {
						type: "string",
						example: "Server error."
					},
					data: {
						type: "object",
						example: {}
					},
					error: {
						type: "object",
						example: {}
					}
				}
			}
		}
	}
};

export const CONFLICT = () => {
	return {
		description: "Data Already exit.",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							example: false
						},
						status_code: {
							type: "number",
							example: 409
						},
						message: {
							type: "string",
							example: "Conflict message."
						}
					}
				}
			}
		}
	};
};

export const UN_AUTH = () => {
	return {
		description: "un-authorization",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							example: false
						},
						status_code: {
							type: "number",
							example: 401
						},
						message: {
							type: "string",
							example: "un-authorization message."
						}
					}
				}
			}
		}
	};
};
type ConflictWithExmParams = {
	description?: string;
	multiExample?: {
		exampleOf: string;
		message: string;
	}[];
};

export const CONFLICT_WITH_EXAMPLE = (params?: ConflictWithExmParams) => {
	let example = params?.multiExample ?? [
		{
			exampleOf: "default",
			message: "Data already exit."
		}
	];
	// Explicitly type the accumulator object as an object with string keys and example value shape
	const exampleConflict = example.reduce<{ [key: string]: { value: { success: boolean; status_code: number; message: string } } }>((acc, v) => {
		acc[v.exampleOf] = {
			value: {
				success: false,
				status_code: 409,
				message: v.message
			}
		};
		return acc;
	}, {});

	return {
		description: params?.description ?? "Data Already exit.",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							example: false
						},
						status_code: {
							type: "number",
							example: 409
						},
						message: {
							type: "string",
							example: "Conflict message."
						}
					}
				},
				examples: exampleConflict
				//  {
				// 	estimateExist: {
				// 		value: { status: 409, msg: "estimate exists" }
				// 	},
				// 	otherConflict: {
				// 		value: { status: 409, msg: "other conflict occurred" }
				// 	}
				// }
			}
		}
	};
};
