import { AppError } from "../../../helper/appError";
import { compareData, encryptPassword } from "../../../helper/bcrypt";
import { generateToken } from "../../../helper/jwt";
import { authSuccessData } from "../dto/authSuccessData";
import { findOneUser, updateAccessToken, updateUser } from "../dto/repo";

export async function login(email: string, password: string) {
	console.log("Logging in user with email:", email);

	const user = await findOneUser({ email });
	if (!user) throw new AppError("USER_NOT_FOUND", 404);

	const isValid = await compareData(password, user.password);
	if (!isValid) throw new AppError("AUTH_INVALID_CREDENTIAL", 401);

	const token = await generateToken(user);
	await updateAccessToken(user.id, token);

	return { ...authSuccessData(user), token };
}

export async function getProfile(userId: string) {
	const user = await findOneUser({ id: userId, is_active: 1 });

	if (!user) throw new AppError("USER_NOT_FOUND", 404);
	return authSuccessData(user);
}

export async function updateProfile(
        userId: string,
        data: { first_name?: string; last_name?: string },
) {
        await updateUser(userId, data);
        const updatedUser = await findOneUser({ id: userId });
        if (!updatedUser) throw new AppError("USER_NOT_FOUND", 404);
        return authSuccessData(updatedUser);
}

export async function changePassword(
        userId: string,
        oldPassword: string,
        newPassword: string,
) {
        const user = await findOneUser({ id: userId });
        if (!user) throw new AppError("USER_NOT_FOUND", 404);

        const isValid = await compareData(oldPassword, user.password);
        if (!isValid) throw new AppError("AUTH_INVALID_CREDENTIAL", 401);

        const hashed = await encryptPassword(newPassword);
        await updateUser(userId, { password: hashed });
        return true;
}

export async function logout(userId: string) {
        await updateUser(userId, {
                access_token: [],
                refresh_token: [],
        });
        return true;
}
