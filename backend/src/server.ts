import express, { Request, Response } from "express";
import config from "config";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/root";
import logger from "./utils/logger.utils";
import { Config } from "../config/default";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { corsOptions } from "./utils/corsOptions.utils";

// Start express app instance
const app = express();

// Get the config details for the app.
const { port, domain } = config.get<Config["server"]>("server");

// Custom Middleware - Logger
app.use(loggerMiddleware);

// Third Party Middleware - Cors
app.use(cors(corsOptions));

// BuiltIn Middleware - Json Parser
app.use(express.json());

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
		res.json({ message: "404 Not Found!" });
	} else {
		res.type("txt").send("404 Not Found!");
	}
});

// Custom Middleware - Error Handler
app.use(errorHandler);

// Start the express app.
app.listen(port, domain, () => {
	logger.info(`Server running on port : ${port}`);
});
