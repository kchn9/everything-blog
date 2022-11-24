const express = require("express");
const app = express();
const {
  requestLogger,
  errorHandler,
  unknownEndpointHandler,
} = require("./utils/middleware");
const postsRouter = require("./controllers/posts");

app.use(requestLogger);
app.use(express.json());

app.use("/api/v1/posts", postsRouter);

app.use(unknownEndpointHandler);
app.use(errorHandler);

module.exports = app;
