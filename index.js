const http = require("http");
const app = require("./app");
const config = require("config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`Running server on port ${config.port}`);
});
