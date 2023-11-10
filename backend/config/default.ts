export type Config = {
	server: {
		port: number;
		domain: string;
	};
};

export default {
	server: {
		port: process.env.PORT ?? 3500,
		domain: "localhost",
	},
};
