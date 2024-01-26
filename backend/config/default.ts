export type Config = {
	server: {
		connection: {
			port: string;
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
			notFound: "404 Not Found!";
		};
	};
};

const config: Config = {
	server: {
		connection: {
			port: process.env.PORT ?? "3500",
			domain: "localhost",
		},
		cors: {
			origin: [
				"http://localhost:3000",
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
