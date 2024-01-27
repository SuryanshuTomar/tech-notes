import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger.utils";
import { Config } from "../../config/default";

export const connectDB = async () => {
	const { dbURI, dbName } = config.get<Config["database"]>("database");

	try {
		const connectionInstance = await mongoose.connect(`${dbURI}/${dbName}`);
		logger.info(
			`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
		);
	} catch (error) {
		logger.error("MONGODB connection FAILED : \n", error);
		process.exit(1);
	}
};
