const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const {
  db: { user, password, name },
} = require("config");
const dbUri = `mongodb+srv://${user}:${password}@cluster0.qlxz8um.mongodb.net/${name}?retryWrites=true&w=majority`;
const postsRouter = require("./controllers/posts");
const {
  requestLogger,
  errorHandler,
  unknownEndpointHandler,
} = require("./utils/middleware");

mongoose
  .connect(dbUri)
  .then(() => {
    logger.info(`Succesfully connected to ${name} database`);
  })
  .catch((e) => {
    logger.error("Error caught.");
    logger.error(e);
  });

app.use(requestLogger);
app.use(express.json());

app.use("/api/v1/posts", postsRouter);

app.use(unknownEndpointHandler);
app.use(errorHandler);

module.exports = app;
