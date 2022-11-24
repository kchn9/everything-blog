const postsRouter = require("express").Router();
const Post = require("../models/post");

postsRouter.get("/", (req, res) => {});

postsRouter.get("/:id", (req, res) => {});

postsRouter.post("/", (req, res) => {});

postsRouter.put("/:id", (req, res) => {});

postsRouter.delete("/:id", (req, res) => {});

module.exports = postsRouter;
