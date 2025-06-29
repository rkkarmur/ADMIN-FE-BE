import fs from "fs";
import path from "path";
import { swaggerJson } from ".";
const swaggerDir = path.join(__dirname, "../swagger");
const swaggerFilePath = path.join(swaggerDir, "swagger.json");

if (!fs.existsSync(swaggerDir)) {
	fs.mkdirSync(swaggerDir);
}
let oldJson = {};
if (fs.existsSync(swaggerFilePath)) {
	oldJson = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));
}

let newJson = { ...swaggerJson };
console.log("changes", JSON.stringify(oldJson) !== JSON.stringify(newJson));
if (JSON.stringify(oldJson) !== JSON.stringify(newJson)) {
	fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerJson, null, 2), "utf-8");
}

console.log(`Swagger JSON file has been updated at ${swaggerFilePath}`);
