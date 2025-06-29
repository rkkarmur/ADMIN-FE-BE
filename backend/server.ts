import { appServer } from "./src/app";
import { env } from "./src/config/env";

try {
	appServer.listen(env.PORT, () => {
		console.log(`🚀 Server running at http://localhost:${env.PORT}`);
	});
} catch (error) {
	console.error("❌ Error starting server:", error);
	process.exit(1);
}
