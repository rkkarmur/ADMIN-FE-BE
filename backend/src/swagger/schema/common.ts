// import { otpType } from "../utils/Constant/common";

export const schemaProperties = {
	name: {
		type: "string",
		example: "John",
		description: "The user's name",
	},
	user_id: { type: "string", description: "User's id" },
	first_name: (fnOf?: string) => {
		return {
			type: "string",
			example: "John",
			description: "First name of " + fnOf || "user",
		};
	},
	last_name: (fnOf?: string) => {
		return {
			type: "string",
			example: "David",
			description: "Last name of " + fnOf || "user",
		};
	},
	email: {
		type: "string",
		format: "email",
		example: "test@gmail.com",
		description: "Email address",
	},
	phone_number: {
		type: "string",
		example: "1234567890",
		description: "Phone number",
	},
	country_code: { type: "string", example: "+44", description: "Country code" },
	password: {
		type: "string",
		description: "password",
		example: "********",
	},
	fcm: {
		type: "string",
		description: "The fcm token",
	},
	id: {
		type: "string",
		description: "MongoDB ObjectId",
		pattern: "^[a-fA-F0-9]{24}$",
	},
	idWithDis: (description?: string) => {
		return {
			type: "string",
			description: description ?? "MongoDB ObjectId",
			pattern: "^[a-fA-F0-9]{24}$",
			example: "67e26230abd6254d8eb6241a",
		};
	},
	idArray: {
		type: "array",
		items: {
			type: "string",
			description: "MongoDB ObjectId",
			pattern: "^[a-fA-F0-9]{24}$",
		},
		description: "Array of MongoDB ObjectIds",
	},
	idArrayWithDis: (description?: string) => {
		return {
			type: "array",
			items: {
				type: "string",
				description: "MongoDB ObjectId",
				pattern: "^[a-fA-F0-9]{24}$",
			},
			description: description ?? "Array of MongoDB ObjectIds",
		};
	},
	amount: {
		type: "number",
		description: "amount",
	},
	amountWithDis: (description: string) => {
		return {
			type: "number",
			description: description ?? "amount",
		};
	},
	integer: (description: string) => {
		return { type: "integer", description: description ?? "" };
	},
	otp: {
		type: "string",
		description: "otp value",
	},
	otpType: {
		type: "string",
		description: "resend for",
		enum: ["login", "register"].filter((element) => element !== "login"),
	},
	file: {
		type: "string",
		format: "binary",
	},
	fileArray: {
		type: "array",
		items: {
			type: "string",
			format: "binary",
			description: "Image files",
		},
	},
	fileWithDic: (description?: string) => {
		return {
			type: "string",
			format: "binary",
			description: description || "file",
		};
	},
	fileArrayWithDis: (description?: string) => {
		return {
			type: "array",
			items: {
				type: "string",
				format: "binary",
				description: description || "files",
			},
		};
	},
	date: {
		type: "string",
		format: "date-time",
		description: "date in ISO string formate.",
	},
	onOff: {
		type: "number",
		description: "enable:1 | disable:0",
		enum: [1, 0],
	},
	/**
	 * common
	 */
	commonString: {
		type: "string",
	},
	stringWithDis: (description?: string) => {
		return {
			type: "string",
			description: description || "Enter string",
		};
	},
	commonNumber: {
		type: "integer",
		description: "Enter integer number",
	},
	numberWithTypes: ({
		type = "number",
		format,
		min,
		max,
		description,
	}: {
		type: "number" | "integer";
		format?: "float" | "double" | "int32" | "int64";
		min?: number;
		max?: number;
		description?: string;
	}) => {
		let result: any = {
			type, // Default type is "number"
		};

		if (format) {
			result.format = format; // Add format if provided
		}
		if (min !== undefined) {
			result.minimum = min; // Add minimum value if provided
		}
		if (max !== undefined) {
			result.maximum = max; // Add maximum value if provided
		}
		if (description) {
			result.description = description; // Add description if provided
		}

		return result;
	},
	url: {
		type: "string",
		format: "uri",
		example: "https://example.com",
		description: "URL of the resource",
	},
	enum: (value: any[]) => {
		return {
			type: "string",
			enum: value,
		};
	},
	enumWithType: (value: any[], type?: string) => {
		return {
			type: type ?? "string",
			enum: value,
		};
	},
	/**
	 * Utility function to generate an enum object with type and descriptions
	 *
	 * @param value - Array of objects containing `data` and `description` for the enum.
	 * @param type - Optional string to specify the type (defaults to 'string').
	 * @returns An object with the `type`, `enum` values, and a formatted `description` string.
	 */
	enumWithTypeDis: (value: { data: any; description: string }[], type: string = "string") => {
		return {
			type: type ?? "string",
			enum: value?.map((v) => v?.data),
			description: value?.map((v) => `  * \`${v.data}\` - ${v.description}`).join("\n"),
		};
	},
};

export const paginationParams = {
	page: {
		name: "page",
		in: "query",
		description: "Page number for pagination",
		required: false,
		schema: {
			type: "integer",
			minimum: 1,
		},
	},
	limit: {
		name: "limit",
		in: "query",
		description: "Number per page",
		required: false,
		schema: {
			type: "integer",
			minimum: 1,
		},
	},
	populate: ({ name, description, example, required }: { name?: string; description?: string; required?: boolean; example?: string }) => {
		return {
			name: name ?? "populate",
			in: "query",
			description: description ?? "Select required field only for output of response json",
			required: required ?? false,
			schema: {
				type: "string",
				example: example ?? "name",
			},
		};
	},
	order: ({ name, description, example, required }: { name?: string; description?: string; required?: boolean; example?: string }) => {
		return {
			name: name ?? "order",
			in: "query",
			description: description ?? "You can parse ordering like fieldName | asc OR fieldName | desc",
			required: required ?? false,
			schema: {
				type: "string",
				example: example ?? "name | asc",
			},
		};
	},
	is_active: {
		name: "is_active",
		in: "query",
		description: "Filter by active status",
		required: false,
		schema: {
			type: "string",
			enum: ["0", "1"],
		},
	},
	is_active_array: {
		name: "is_active",
		in: "query",
		description: "Filter by active status",
		required: false,
		schema: {
			type: "array",
			items: {
				type: "string",
				// enum: ["0", "1", "2"],
			},
			example: ["0", "1", "2"],
		},
		style: "form",
		explode: true,
	},
	array: (name: string, required: boolean = false, example?: string[]) => {
		return {
			name: name,
			in: "query",
			description: "Filter by " + name,
			required: required,
			schema: {
				type: "array",
				items: {
					type: "string",
				},
				example: example ? example : ["string"],
			},
			style: "form",
			explode: true,
		};
	},
	id: (name: string, idOf: string, required: boolean = false) => {
		return {
			name: name,
			in: "query",
			description: "ID of the " + idOf + " to retrieve",
			required: required,
			schema: {
				type: "string",
				format: "objectid",
			},
		};
	},
	status: (name: string, status: any[], required: boolean = false) => {
		return {
			name: name,
			in: "query",
			description: "Filter by " + name,
			required: required,
			schema: {
				type: "string",
				enum: status,
			},
		};
	},

	enum: ({ name = "", status = [], description = "", required = false }: { name?: string; status?: string[]; description?: string; required?: boolean }) => {
		return {
			name: name,
			in: "query",
			description: description,
			required: required,
			schema: {
				type: "string",
				enum: status,
			},
		};
	},
	enumWithTypeDis: (name = "", value: { data: string | number | boolean; description: string }[], required = false) => {
		return {
			name: name,
			in: "query",
			description: value?.map((v) => `  * \`${v.data}\` - ${v.description}`).join("\n"),
			required: required,
			schema: {
				type: "string",
				enum: value?.map((v) => v?.data),
			},
		};
	},

	search: () => {
		return {
			name: "search",
			in: "query",
			description: "search",
			required: false,
			schema: {
				type: "string",
				description: "search params",
			},
		};
	},
	date: (name: string, required: boolean = false) => {
		return {
			name: name,
			in: "query",
			description: "Date in ISO string formate",
			required: required,
			schema: {
				type: "string",
				format: "date-time",
			},
		};
	},
	string: ({ name, required }: { name: string; required: boolean }) => {
		return {
			name,
			in: "query",
			description: "filter",
			required,
			schema: {
				type: "string",
				description: name + " params",
			},
		};
	},
	stringQuery: ({ name, required = false }: { name: string; required?: boolean }) => {
		return {
			name,
			in: "query",
			description: "filter",
			required,
			schema: {
				type: "string",
				description: name + " params",
			},
		};
	},
	numberParam: ({ name, required = false, description = "A numeric parameter" }: { name: string; required?: boolean; description?: string }) => {
		return {
			name,
			in: "query",
			description,
			required,
			schema: {
				type: "number",
				description,
			},
		};
	},
};

export const commonLocationFormData = {
	"location[address]": schemaProperties.commonString,
	"location[country]": schemaProperties.commonString,
	"location[state]": schemaProperties.commonString,
	"location[city]": schemaProperties.commonString,
	"location[zip]": schemaProperties.commonString,
	"location[lat]": schemaProperties.commonString,
	"location[long]": schemaProperties.commonString,
};

export const commonLocationObject = {
	type: "object",
	properties: {
		lat: {
			type: "number",
			description: "Latitude of the location",
		},
		long: {
			type: "number",
			description: "Longitude of the location",
		},
		address: {
			type: "string",
			description: "Address of the location",
		},
		state: {
			type: "string",
			description: "State of the location",
		},
		city: {
			type: "string",
			description: "City of the location",
		},
		zip: {
			type: "string",
			description: "Zip code of the location",
		},
	},
	description: "Location details",
};

export const commonIdOps = {
	content: {
		"application/json": {
			schema: {
				type: "object",
				properties: {
					id: schemaProperties?.id,
				},

				required: ["id"],
			},
		},
	},
};
