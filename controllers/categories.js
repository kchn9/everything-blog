const categoriesRouter = require("express").Router();
const Category = require("../models/category");
const Post = require("../models/post");

categoriesRouter.get("/", (req, res) => {
  Category.find({})
    .populate("posts")
    .then((categories) => {
      res.status(200).json(categories);
    });
});

categoriesRouter.get("/:id", (req, res, next) => {
  const categoryId = req.params.id;

  Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.sendStatus(404);
      }
      return res.status(200).json(category);
    })
    .catch((e) => next(e));
});

categoriesRouter.post("/", (req, res, next) => {
  const body = req.body;
  const newCategory = new Category({
    name: body.name,
  });

  newCategory
    .save()
    .then((savedCategory) => {
      res.status(201).json(savedCategory);
    })
    .catch((e) => next(e));
});

categoriesRouter.put("/:id", (req, res, next) => {
  const categoryId = req.params.id;
  const body = req.body;
  const updateQuery = {
    name: body.name,
  };

  Category.findByIdAndUpdate(categoryId, updateQuery, { new: true })
    .then((updatedCategory) => {
      res.status(200).json(updatedCategory);
    })
    .catch((e) => next(e));
});

categoriesRouter.delete("/:id", (req, res, next) => {
  const categoryId = req.params.id;

  Category.findByIdAndDelete(categoryId)
    .then((deletedCategory) => {
      if (!deletedCategory) {
        return res.sendStatus(404);
      }
      Post.find({
        categories: {
          $in: deletedCategory._id,
        },
      }).then((posts) => {
        for (const post of posts) {
          Post.findByIdAndUpdate(post._id, {
            $pull: { categories: deletedCategory._id },
          }).catch((e) => next(e));
        }
      });
      return res.status(200).json(deletedCategory);
    })
    .catch((e) => next(e));
});

module.exports = categoriesRouter;
