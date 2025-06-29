import { Prisma } from "../../src/generated/prisma"; // Adjust path to your generated Prisma types
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
export interface JwtDecoded {
        id: string;
        role: string;
        created_at: string;
        business?: string;
}

interface JwtPayload extends JwtDecoded {}

interface TokenOptions {
	audience: string;
	expiresIn?: string;
}
/**
 * Generate JWT token
 * @param data - User data to encode in the token
 * @param expiresIn - Optional expiration time (e.g., "1h", "7d")
 * @returns A signed JWT token string
 */
export const generateToken = async (data: Prisma.UserGetPayload<{ include: { role: true } }>, expiresIn?: any): Promise<string> => {
	const options: SignOptions = {
		audience: data?.role?.name,
	};

	if (expiresIn) {
		options.expiresIn = expiresIn;
	}

	const payload = {
		id: data?.id,
		role: data.role_id,
		created_at: new Date().toISOString(),
		business: data.business,
	};

	return jwt.sign(payload, env.JWT_SECRET as string, options);
};

/**
 * Verify JWT token
 * @param tokenData - The token string to verify
 * @param req - The Express Request object (optional, useful for context)
 * @returns Object indicating success or failure with token data or error code/message
 */
export interface VerifyTokenSuccess {
        success: true;
        data: JwtDecoded;
}

export interface VerifyTokenFailure {
        success: false;
        code: number;
        msg: string;
}

export type VerifyTokenResult = VerifyTokenSuccess | VerifyTokenFailure;

export const verifyToken = (tokenData: string): VerifyTokenResult => {
        try {
                const decoded = jwt.verify(tokenData, env.JWT_SECRET) as JwtDecoded;
                return { success: true, data: decoded };
        } catch (err: any) {
		console.error("JWT ERROR", err);
		switch (err.name) {
			case "TokenExpiredError":
				return { success: false, code: 0, msg: "TOKEN_EXPIRED" };
			case "JsonWebTokenError":
				return { success: false, code: 1, msg: "AUTH_UN_AUTH" };
			case "NotBeforeError":
				return { success: false, code: 2, msg: "TOKEN_INACTIVE" };
			default:
				return { success: false, code: 3, msg: "TOKEN_INVALID" };
		}
	}
};
