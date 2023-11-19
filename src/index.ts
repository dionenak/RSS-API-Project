import express, { Request, Response } from "express";
import router from "./router/api";
import * as bodyParser from "body-parser";
import config from "config";
// set the port
const port = config.get("port");

// set up our express app
const app = express();
// Configuring body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// listen for requests
app.listen(port, function () {
	console.log("Ready to Go!");
});
