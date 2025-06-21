import fs from "fs";
import path from "path";

const baseSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
`;

const prismaModules = [path.join(__dirname, "../src/prisma/user/user.prisma"), path.join(__dirname, "../src/prisma/role/role.prisma")];

const mergedModels = prismaModules.map((file) => fs.readFileSync(file, "utf-8")).join("\n\n");

const outputPath = path.join(__dirname, "../prisma/generated.prisma");
fs.writeFileSync(outputPath, baseSchema + "\n\n" + mergedModels);

console.log("✅ Prisma schema merged successfully to prisma/generated.prisma");
