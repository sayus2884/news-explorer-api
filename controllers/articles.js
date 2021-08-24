const Articles = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const NotAuthorizedError = require('../errors/not-authorized-err');
const AlreadyExistsError = require('../errors/already-exists-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getArticles = (req, res, next) => {
  Articles.find({})
    .then((articles) => res.send(articles))

    .catch(next)
}

module.exports = {
  getArticles
}
