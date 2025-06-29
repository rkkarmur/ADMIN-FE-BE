import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			"@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
			"@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@store": fileURLToPath(new URL("./src/store", import.meta.url)),
			"@config": fileURLToPath(new URL("./src/config", import.meta.url)),
			"@redux": fileURLToPath(new URL("./src/redux", import.meta.url)),
		},
	},
});
