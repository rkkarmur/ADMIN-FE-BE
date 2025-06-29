import { Request, Response, NextFunction } from "express";
import { verifyToken, VerifyTokenResult, JwtDecoded } from "../helper/jwt";
import { responseSender } from "../helper/resFormate";
import { findOneUser } from "../modules/auth/dto/repo";

// Extend Request interface for custom properties
declare global {
    namespace Express {
        interface Request {
            tokenData?: JwtDecoded;
            role?: string;
        }
    }
}

/**
 * Middleware to protect routes based on session token and role
 * @param allowedRoles - Array of allowed roles or "common"
 */
export const jwtAuthSession = (allowedRoles: string[] | "common") => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.session?.token as string;

        if (!token) {
            responseSender(req, res, 401, false, "AUTH_MISSING_AUTH");
            return;
        }

        const tokenData: VerifyTokenResult = verifyToken(token);

        if (!tokenData.success) {
            responseSender(req, res, 401, false, tokenData.msg);
            return;
        }

        const decoded = tokenData.data as JwtDecoded;

        // Get user with role
        const user = await findOneUser({ id: decoded.id });

        if (!user || user.is_active !== 1 || !user.access_token?.includes(token)) {
            responseSender(req, res, 401, false, "AUTH_UN_AUTH");
            return;
        }

        const userRoleName = user.role?.name;

        // Access logic
        if (
            allowedRoles === "common" ||
            (Array.isArray(allowedRoles) && userRoleName && allowedRoles.includes(userRoleName))
        ) {
            req.tokenData = decoded;
            req.role = userRoleName;
            next();
        } else {
            responseSender(req, res, 401, false, "AUTH_UN_AUTH");
        }
    };
};
