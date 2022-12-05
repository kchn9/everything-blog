require("dotenv").config();

module.exports = {
  port: 8080,
  db: {
    user: "kchn9",
    password: process.env.DB_PASSWORD,
    name: "blog",
  },
};
