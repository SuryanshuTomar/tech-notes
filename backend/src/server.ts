import dotenv from "dotenv";
import config from "config";
import logger from "./utils/logger.utils";
import { app } from "./app";
import { Config } from "../config/default";

// Configure the dotenv to access the environment variables
dotenv.config({
	path: ".env",
});

// Get the config details for the app.
const { port, domain } =
	config.get<Config["server"]["connection"]>("server.connection");

// Start the express app.
app.listen(port, domain, () => {
	logger.info(`Server running on port : ${port}`);
});
