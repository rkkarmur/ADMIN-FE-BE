import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../../prisma/client";
export const findOneUser = async (where: object): Promise<Prisma.UserGetPayload<{ include: { role: true } }> | null> => {
	return await prisma.user.findFirst({
		where,
		include: { role: true },
	});
};

export const updateAccessToken = async (userId: string, accessToken: string) => {
	return await prisma.user.update({
		where: { id: userId },
		data: {
			access_token: {
				push: accessToken,
			},
			last_login: new Date(),
		},
	});
};

export const updateUser = async (
        userId: string,
        data: Prisma.UserUpdateInput,
) => {
        return await prisma.user.update({
                where: { id: userId },
                data,
        });
};
