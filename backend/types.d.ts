import { Errback } from "express";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test";
			PORT: number;
			CORS_ORIGIN: string;
			DOMAIN: string;
			DB_URI: string;
			DB_NAME: string;
		}
	}
}

export interface Error extends Errback {
	message: string;
	stack: string;
}


// Models 
