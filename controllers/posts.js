const postsRouter = require("express").Router();
const Post = require("../models/post");
const Category = require("../models/category");

postsRouter.get("/", (req, res) => {
  Post.find({}).then((posts) => {
    res.status(200).json(posts);
  });
});

postsRouter.get("/search", (req, res, next) => {
  const { query } = req;

  if (query.hasOwnProperty("contains")) {
    Post.find()
      .or([
        { title: { $regex: query.contains } },
        { body: { $regex: query.contains } },
      ])
      .then((posts) => {
        if (!posts) {
          return res.sendStatus(404);
        }
        return res.status(200).json(posts);
      })
      .catch((e) => next(e));
  } else {
    return res.sendStatus(400);
  }
});

postsRouter.get("/:id", (req, res, next) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.sendStatus(404);
      }
      return res.status(200).json(post);
    })
    .catch((e) => next(e));
});

postsRouter.post("/", (req, res, next) => {
  const body = req.body;
  const newPost = new Post({
    title: body.title,
    body: body.body,
    categories: body.categories,
  });

  newPost
    .save()
    .then((post) => {
      if (body.categories) {
        for (const categoryId of body.categories) {
          Category.findByIdAndUpdate(
            categoryId,
            {
              $addToSet: { posts: post._id },
            },
            { new: true }
          ).catch((e) => next(e));
        }
      }
      res.status(201).json({
        post,
      });
    })
    .catch((e) => next(e));
});

postsRouter.put("/:id", (req, res, next) => {
  const postId = req.params.id;
  const body = req.body;
  const updateQuery = {
    title: body.title,
    body: body.body,
    categories: body.categories,
  };
  Post.findByIdAndUpdate(postId, updateQuery, { new: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.sendStatus(404);
      }

      if (updateQuery.categories) {
        for (const categoryId of updateQuery.categories) {
          Category.findByIdAndUpdate(
            categoryId,
            {
              $addToSet: { posts: updatedPost._id },
            },
            { new: true }
          ).catch((e) => next(e));
        }
      }

      return res.status(200).json(updatedPost);
    })
    .catch((e) => next(e));
});

postsRouter.delete("/:id", (req, res, next) => {
  const postId = req.params.id;
  Post.findByIdAndDelete(postId)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.sendStatus(404);
      }
      return res.status(200).json(deletedPost);
    })
    .catch((e) => next(e));
});

module.exports = postsRouter;
