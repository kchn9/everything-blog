const multer = require("multer");
const Post = require("../models/post");
const Cover = require("../models/cover");
const Category = require("../models/category");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const postsRouter = require("express").Router();

postsRouter.get("/", (req, res) => {
  Post.find({}).then((posts) => {
    res.status(200).json(posts);
  });
});

postsRouter.get("/search", (req, res, next) => {
  const { query } = req;

  if (query.hasOwnProperty("contains")) {
    // find posts containing query
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
  } else if (query.hasOwnProperty("category")) {
    // filter by category
    const categoryName = query.category;
    console.log(categoryName);
    Category.findOne({ name: categoryName })
      .then((category) => {
        if (!category) {
          return res.sendStatus(404);
        }
        Post.find({ categories: { $in: category._id } })
          .then((posts) => {
            return res.status(200).json(posts);
          })
          .catch((e) => next(e));
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

postsRouter.get("/covers/:id", (req, res, next) => {
  const coverId = req.params.id;
  Cover.findById(coverId)
    .then((cover) => {
      if (!cover) {
        return res.sendStatus(404);
      }
      return res.status(200).json(cover);
    })
    .catch((e) => next(e));
});

postsRouter.post("/covers", upload.single("file"), (req, res, next) => {
  if (req.file) {
    const newCover = new Cover({
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      fileName: `${Date.now()}-${req.file.originalname}`,
    });
    newCover
      .save()
      .then((savedCover) => {
        res.status(201).json(savedCover);
      })
      .catch((e) => next(e));
  } else {
    res.sendStatus(400);
  }
});

postsRouter.delete("/covers/:id", (req, res, next) => {
  const coverId = req.params.id;
  Cover.findByIdAndDelete(coverId)
    .then((deletedCover) => {
      if (!deletedCover) {
        return res.sendStatus(404);
      }
      return res.status(200).json(deletedCover);
    })
    .catch((e) => next(e));
});

postsRouter.post("/", (req, res, next) => {
  const body = req.body;

  const newPost = new Post({
    title: body.title,
    body: body.body,
    categories: body.categories,
    coverId: body.coverId,
  });

  newPost
    .save()
    .then((post) => {
      if (body.coverId) {
        Cover.findByIdAndUpdate(
          body.coverId,
          { $set: { postId: post._id } },
          { new: true }
        ).catch((e) => next(e));
      }
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
