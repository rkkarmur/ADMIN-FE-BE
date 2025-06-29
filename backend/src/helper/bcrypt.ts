import bcrypt from "bcrypt";

export const encryptPassword = async (data: string) => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT || 12));
	const hash = await bcrypt.hash(data, salt);
	return hash;
};
export const compareData = async (data: string, encrypted: string) => {
	return await bcrypt.compare(data, encrypted);
};
