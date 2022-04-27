"use strict";

const User = require("./user");

module.exports = (app) => {
    // Load API Routes
	app.use("/user", new User(app));
    // Load other routes
	// --------

    app.get("/health_check", (req, res) => {
        res.sendStatus(200);
    });
};
