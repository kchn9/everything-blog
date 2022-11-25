const morgan = require("morgan");
const logger = require("./logger");

const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
    Object.keys(req.body).length === 0
      ? ""
      : `| body: ${JSON.stringify(req.body)}`,
  ].join(" ");
});

function errorHandler(error, req, res, next) {
  logger.error(error);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      message: error.message,
    });
  }
  next(error);
}

const unknownEndpointHandler = (req, res) => {
  return res.sendStatus(404);
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpointHandler,
};
