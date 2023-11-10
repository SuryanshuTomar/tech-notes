import logger from "pino";
import dayjs from "dayjs";

const log = logger({
	transport: {
		target: "pino-pretty", // This is package "pino-pretty"
	},
	base: {
		pid: false,
	},
	timestamp() {
		return `, "time":"${dayjs().format()}"`;
	},
});

export default log;
