import dotenv from "dotenv";
// Configure the dotenv to access the environment variables
dotenv.config({
	path: ".env",
});

export type Config = {
	server: {
		connection: {
			port: number;
			domain: string;
		};
		middleware: {
			JSONDataLimit: string;
			URLDataLimit: string;
		};
		cors: {
			origin: string[];
		};
		response: {
			notFound: string;
		};
	};
};

const config: Config = {
	server: {
		connection: {
			port: process.env.PORT ?? 8000,
			domain: process.env.DOMAIN,
		},
		cors: {
			origin: [
				process.env.CORS_ORIGIN,
				"http://www.technotes.com",
				"http://technotes.com",
			],
		},
		middleware: {
			JSONDataLimit: "16kb",
			URLDataLimit: "16kb",
		},
		response: {
			notFound: "404 Not Found!",
		},
	},
};

export default config;
