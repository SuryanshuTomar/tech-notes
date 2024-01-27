import dotenv from "dotenv";
import config from "config";
import mongoose from "mongoose";
import logger, { logEvents } from "./utils/logger.utils";
import { app } from "./app";
import { Config } from "../config/default";
import { connectDB } from "./db/connect";

// Configure the dotenv to access the environment variables
dotenv.config({
	path: ".env",
});

// Get the config details for the app.
const {
	currentEnvironment,
	connection: { domain, port },
} = config.get<Config["server"]>("server");

// Start the express app.

// Method 1 -
// connectDB();

// mongoose.connection.once("open", () => {
// 	app.listen(port, domain, () => {
// 		logger.info(`Server running on port : ${port}`);
// 	});
// });

// mongoose.connection.once("error", (error) => {
// 	logger.info("Server did not start!");
// 	logEvents(
// 		`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
// 		"mongoErrLog.log",
// 		"error"
// 	);
// });

// Method 2 -
connectDB()
	.then(() => {
		logger.info("Environment : " + currentEnvironment);
		app.listen(port, domain, () => {
			logger.info(`Server running on port : ${port}`);
		});
	})
	.catch((error) => {
		logger.info("Server did not start!");
		logEvents(
			`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
			"mongoErrLog.log",
			"error"
		);
	});
