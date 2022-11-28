const mongoose = require("mongoose");

const coverSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cover", coverSchema);
