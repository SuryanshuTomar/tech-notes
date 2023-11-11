import fs from "fs";
import fsPromises from "fs/promises";
import logger, { Level } from "pino";
import path from "path";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

export const getDateTimeLog = (): string => {
	const dateTime = format(new Date(), "yyyy-MM-dd | HH:mm:ss");
	return dateTime;
};

export const logEvents = async (
	message: string,
	logFileName: string,
	logtype: Level = "info"
): Promise<void> => {
	const logItem = `${getDateTimeLog()}\t${uuid()}\t${message}\n`;

	try {
		// If the directory of "logs" doesn't exist then create it.
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}

		// Otherwise just append the logs in the file inside the "logs" directory
		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logFileName),
			logItem
		);

		// log to the console as well
		log[logtype](logItem);
	} catch (error: any) {
		console.log(error);
	}
};

const log = logger({
	transport: {
		target: "pino-pretty", // This is package "pino-pretty"
	},
	base: {
		pid: false,
	},
	timestamp() {
		return `, "time":"${getDateTimeLog()}"`;
	},
});

export default log;
