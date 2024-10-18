const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'debug', // Set the default log level
    format: format.combine(
        format.json() // Log in JSON format
    ),
    transports: [
        new transports.Console(), // Log to the console
    ],
});

module.exports = logger;
