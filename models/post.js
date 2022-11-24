const mongoose = require("mongoose");
const logger = require("../utils/logger");
const {
  db: { user, password, name },
} = require("config");
const dbUri = `mongodb+srv://${user}:${password}@cluster0.qlxz8um.mongodb.net/${name}?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(() => {
    logger.info(`Succesfully connected to ${name} database`);
  })
  .catch((e) => {
    logger.error("Error caught.");
    logger.error(e);
  });

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
