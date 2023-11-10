import express, { Request, Response } from "express";
import config from "config";
import path from "path";
import router from "./routes/root";
import logger from "./utils/logger";
import { Config } from "../config/default";

// Start express app instance
const app = express();

// Get the config details for the app.
const { port, domain } = config.get<Config["server"]>("server");

// Serve Static files from the server
app.use("/", express.static(path.join(__dirname, "..", "/public")));

// Routes
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

// Start the express app.
app.listen(port, domain, () => {
	logger.info(`Server running on port : ${port}`);
});
