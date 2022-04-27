"use strict";
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const config = require("./config");
const routes = require("./routes");
const Logger = require("./utils/logger");
const { debug } = new Logger();
const cors = require("cors");

debug("Starting app with NODE_ENV=%s", config.env);

// Initialize the app
let app = express();

if (config.env === "development") {
	app.use(morgan("dev"));
}

if (config.env === "development") {
	app.use(cors());
} else {
	app.use(
		cors({
			origin: ["https://test.com/"],
		})
	);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/health-check", function (req, res) {
	res.status(200).send("Welcome!");
});

// Load routes
routes(app);
module.exports = app;
