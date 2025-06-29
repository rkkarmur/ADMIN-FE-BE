import cors from "cors";

const allowedOrigins = [
	"https://abc.com",
	// you can add more production URLs here
];

export const corsMiddleware = cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true); // allow requests with no origin (like mobile apps or curl)

		// Allow localhost on any port
		const localhostRegex = /^http:\/\/localhost:\d+$/;

		if (allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
});
