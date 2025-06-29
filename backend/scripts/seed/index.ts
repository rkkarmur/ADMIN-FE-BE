import { env } from "../../src/config/env";
import { encryptPassword } from "../../src/helper/bcrypt";
import { prisma } from "../../src/prisma/client";

const business = "business_1";
const roleSlugId = "admin-role";
const roleName = "Admin Role";
const adminEmail = env.ADMIN_EMAIL;
const adminPassword = env.ADMIN_PASSWORD;

async function main() {
	// Find or create Role
	let role = await prisma.role.findFirst({
		where: {
			slug_id: roleSlugId,
			business,
		},
	});

	if (!role) {
		role = await prisma.role.create({
			data: {
				name: roleName,
				slug_id: roleSlugId,
				permission: [
					{ name: "user", access: ["read", "add", "edit"] },
					{ name: "role", access: ["read"] },
				],
				business,
			},
		});
	} else {
		role = await prisma.role.update({
			where: {
				id: role.id,
			},
			data: {
				permission: [
					{ name: "user", access: ["read", "add", "edit"] },
					{ name: "role", access: ["read"] },
				],
				updated_at: new Date(),
			},
		});
	}

	const hashedPassword = await encryptPassword(adminPassword);

	// Find or create User
	const existingUser = await prisma.user.findFirst({
		where: {
			email: adminEmail,
			business,
		},
	});

	if (existingUser) {
		await prisma.user.update({
			where: { id: existingUser.id },
			data: {
				role_id: role.id,
				password: hashedPassword,
				last_login: new Date(),
				updated_at: new Date(),
				is_active: 1,
			},
		});
	} else {
		await prisma.user.create({
			data: {
				first_name: "admin",
				last_name: "user",
				email: adminEmail,
				password: hashedPassword,
				refresh_token: [],
				access_token: [],
				forgot_pass_token: [],
				last_login: new Date(),
				business,
				role_id: role.id,
				is_active: 1,
			},
		});
	}

	console.log("✅ Seeded admin role and user.");
}

main()
	.catch((e) => {
		console.error("❌ Error seeding data:", e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
