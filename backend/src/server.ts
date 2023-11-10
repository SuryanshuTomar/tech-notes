import express from "express";
import config from "config";
import { Config } from "./config/default";

const app = express();
const { port, domain } = config.get<Config["server"]>("server");

app.listen(port, domain, () => {
	console.log(`Server running on port : ${port}`);
});
