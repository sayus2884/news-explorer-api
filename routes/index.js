const router = require('express').Router();

const users = require("./users");
const articles = require("./articles");

router;

module.exports = router

  .use(users)
  .use(articles);
