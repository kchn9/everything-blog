const postsRouter = require("express").Router();
const Post = require("../models/post");

postsRouter.get("/", (req, res) => {
  Post.find({}).then((posts) => {
    res.status(200).json(posts);
  });
});

postsRouter.get("/:id", (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.sendStatus(404);
      }
      return res.status(200).json(post);
    })
    .catch((e) => {
      res.status(400).json({
        message: e.message,
      });
    });
});

postsRouter.post("/", (req, res) => {
  const { title, body } = req.body;
  const newPost = new Post({
    title,
    body,
  });
  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        post,
      });
    })
    .catch((e) => {
      res.status(400).json({
        message: e.message,
      });
    });
});

postsRouter.put("/:id", (req, res) => {
  const postId = req.params.id;
  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.sendStatus(404);
      }
      return res.status(200).json(updatedPost);
    })
    .catch((e) => {
      res.status(400).json({
        message: e.message,
      });
    });
});

postsRouter.delete("/:id", (req, res) => {
  const postId = req.params.id;
  Post.findByIdAndDelete(postId)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.sendStatus(404);
      }
      return res.status(200).json(deletedPost);
    })
    .catch((e) => {
      res.status(400).json({
        message: e.message,
      });
    });
});

module.exports = postsRouter;
