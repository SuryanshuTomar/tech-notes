import { NextFunction, Request, Response } from "express";
import { logEvents } from "../utils/logger.utils";
import { Error } from "../../types";
import logger from "../utils/logger.utils";

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const logMessage = `${error.name}\t${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
	const fileName = "errLog.log";
	logEvents(logMessage, fileName, "error");

	// Log error stack
	logger.error(error.stack);

	const status = res.statusCode ?? 500; // Server error
	res.statusCode = status;

	res.json({
		message: error.message,
	});
};
