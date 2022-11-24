const express = require("express");
const app = express();
const { requestLogger } = require("./utils/middleware");
const postsRouter = require("./controllers/posts");

app.use(requestLogger);

app.use("/api/v1/posts", postsRouter);

module.exports = app;
