import { Errback } from "express";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test";
			PORT: number;
			CORS_ORIGIN: string;
			DOMAIN: string;
			DBURI: string;
			DBNAME: string;
		}
	}
}

export interface Error extends Errback {
	message: string;
	stack: string;
}
