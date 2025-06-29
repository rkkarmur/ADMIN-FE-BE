import { Prisma } from "../../../generated/prisma"; // Adjust path to your generated Prisma types

/**
 * Returns filtered user data on successful auth
 * @param data - Prisma.User object
 */
export const authSuccessData = (data: Prisma.UserGetPayload<{ include: { role: true } }>) => ({
	id: data.id,
	first_name: data.first_name,
	last_name: data.last_name,
	email: data.email,
	role: data.role,
	business: data.business,
});
