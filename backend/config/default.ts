export type Config = {
	server: {
		port: number;
		domain: string;
	};
	cors: {
		origin: string[];
	};
};

export default {
	server: {
		port: process.env.PORT ?? 3500,
		domain: "localhost",
	},
	cors: {
		origin: [
			"http://localhost:3000",
			"http://www.technotes.com",
			"http://technotes.com",
		],
	},
};
