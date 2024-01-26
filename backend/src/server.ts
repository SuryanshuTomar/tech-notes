import config from "config";
import { app } from "./app";
import logger from "./utils/logger.utils";
import { Config } from "../config/default";

// Get the config details for the app.
const { port, domain } = config.get<Config["server"]>("server");

// Start the express app.
app.listen(port, domain, () => {
	logger.info(`Server running on port : ${port}`);
});
