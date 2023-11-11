import config from "config";
import { CorsOptions } from "cors";
import { Config } from "../../config/default";
import logger from "./logger.utils";

// Get the Allowed Origin list
const { origin: allowedOrigins } = config.get<Config["cors"]>("cors");

console.log("Allowed origins : ", allowedOrigins);
``;

export const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			// No origin (origin === undefined) it applied so that we can access our api for testing purposes using tools like postman.
			// otherwise if the origin is from the allowedOrigins list then we will just simply pass true in the callback.
			console.log("check1");

			callback(null, true); // callback(err, origin successfull or not)
		}
		// if we don't have an origin matching the list of allowedOrigins. then we will simple return an error.
		else {
			console.log("check2");
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
