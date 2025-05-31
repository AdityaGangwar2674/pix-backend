const morgan = require("morgan");

const logger = morgan("combined"); // Apache combined format

module.exports = logger;
