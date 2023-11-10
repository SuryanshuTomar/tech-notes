export type Config = {
	server: {
		port: number;
		domain: string;
	};
};

module.exports = {
	server: {
		port: process.env.PORT ?? 3500,
		domain: "localhost",
	},
};
