import express, { Request, Response } from "express";

import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/root";
import config from "config";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { corsOptions } from "./utils/corsOptions.utils";
import { Config } from "../config/default";

// Config data
const { JSONDataLimit, URLDataLimit } =
	config.get<Config["server"]["middleware"]>("server.middleware");
const { notFound } =
	config.get<Config["server"]["response"]>("server.response");

// Start express app instance
const app = express();

// Custom Middleware - Logger
app.use(loggerMiddleware);

// Third Party Middleware - Cors
app.use(cors(corsOptions));

// BuiltIn Middleware - Json Parser
app.use(express.json({ limit: JSONDataLimit })); // limit the json to 16kb data.

// BuiltIn Middleware - Url Encoder
app.use(express.urlencoded({ extended: true, limit: URLDataLimit })); // extended here means that we can give the data in the url in the nested object form.

// Third Party Middleware - Cookie Parser
app.use(cookieParser());

// BuiltIn Middleware - To serve static files from the server
app.use("/", express.static(path.join(__dirname, "..", "public")));

// Custom Middleware - Router middleware
app.use("/", router);

// Endpoint Not Found
app.all("*", (req: Request, res: Response) => {
	res.status(404);

	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "..", "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: notFound.message });
	} else {
		res.type("txt").send(notFound.message);
	}
});

// Custom Middleware - Error Handler
app.use(errorHandler);

export { app };
