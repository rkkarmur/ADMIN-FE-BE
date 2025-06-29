import dotenv from "dotenv";
dotenv.config();

export const env = {
	JWT_SECRET: process.env.JWT_SECRET || "super-secret",
	SESSION_SECRET: process.env.SESSION_SECRET || "super-secret-session",
	JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
	PORT: process.env.PORT || 3000,
	DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/mydatabase",
	SALT: process.env.SALT || 12,

	//admin seed
	ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@gmail.com",
	ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "Admin@123",
};
