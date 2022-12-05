const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utils/logger");
const {
  db: { user, password, name },
} = require("config");
const dbUri = `mongodb+srv://${user}:${password}@cluster0.qlxz8um.mongodb.net/${name}?retryWrites=true&w=majority`;
const {
  requestLogger,
  errorHandler,
  unknownEndpointHandler,
} = require("./utils/middleware");
const postsRouter = require("./controllers/posts");
const categoriesRouter = require("./controllers/categories");

mongoose
  .connect(dbUri)
  .then(() => {
    logger.info(`Succesfully connected to ${name} database`);
  })
  .catch((e) => {
    logger.error("Error caught.");
    logger.error(e);
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

app.use(express.static("dist"));

app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/posts", postsRouter);

app.use(unknownEndpointHandler);
app.use(errorHandler);

module.exports = app;
