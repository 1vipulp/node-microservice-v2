const app = require("./../app");
const config = require("./../config");
const Logger = require("./../utils/logger");
const { createServer } = require("http");

const logger = new Logger();

/**
 * Normalize a port into a number, string, or false.
 */

let normalizePort = (val) => {
	let port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

let onError = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}

	let bind = typeof port === "string"
		? "Pipe " + port
		: "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			logger.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			logger.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

/**
 * Event listener for HTTP server "listening" event.
 */

let onListening = () => {
	let addr = server.address();
	let bind = typeof addr === "string"
		? "pipe " + addr
		: "port " + addr.port;
	logger.debug("Listening on " + bind);
	console.log(`"Listening on ${bind}`);
};

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(config.server.port);
app.set("port", port);

/**
 * Create HTTP server.
 */
server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
