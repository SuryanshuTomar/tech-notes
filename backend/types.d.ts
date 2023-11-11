import { Errback } from "express";

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";
		PORT: number;
	}
}

export interface Error extends Errback {
	message: string;
	stack: string;
}
