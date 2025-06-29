import session from "express-session";
declare module "express-session" {
	interface SessionData {
		token?: string;
		tz?: string | null;
	}
}
import connectMongoDBSession from "connect-mongodb-session";
import { env } from "../config/env";

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
	uri: env.DATABASE_URL,
	collection: "mySessions",
	/**
	 * session expire time
	 */
	expires: 24 * 60 * 60 * 1000 * 365,
});
/**
 * session
 */
export let sessionMiddleware = session({
	name: "myProject.sid", // custom name
	secret: env.SESSION_SECRET, // secret key for signing the session ID cookie
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 * 365 }, //maxAge: 24 * 60 * 60 * 1000
	store: store,
});
