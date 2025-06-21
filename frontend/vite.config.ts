import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@alias": fileURLToPath(new URL("./src/alias", import.meta.url)),
			"@store": fileURLToPath(new URL("./src/store", import.meta.url)),
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@config": fileURLToPath(new URL("./src/config", import.meta.url)),
		},
	},
});
