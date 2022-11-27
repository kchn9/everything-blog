const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cover: {
      type: Buffer,
      contentType: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
