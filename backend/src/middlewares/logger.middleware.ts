import { NextFunction, Request, Response } from "express";
import { logEvents } from "../utils/logger.utils";

export const loggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Log Events in the log file
	const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
	const fileName = "reqLog.log";
	logEvents(logMessage, fileName, "info");

	next();
};
