const morgan = require("morgan");

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

module.exports = {
  requestLogger,
};
