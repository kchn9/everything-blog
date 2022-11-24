require("dotenv").config();

module.exports = {
  port: 3000,
  db: {
    user: "kchn9",
    password: process.env.DB_PASSWORD,
    name: "blog",
  },
};
