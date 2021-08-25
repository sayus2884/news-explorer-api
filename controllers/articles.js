const Articles = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getArticles = (req, res, next) => {
  Articles.find({})
    .then((articles) => res.send(articles))

    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Articles.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then(() => res.send({
      keyword, title, text, date, source, link, image,
    }))

    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Articles.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article not found.');
      }

      if (article.owner !== req.user._id) {
        throw new ForbiddenError('Not owner of card');
      }
    })

    .then(() => Articles.findByIdAndDelete(articleId))
    .then(() => res.send({ message: 'Card deleted.' }))

    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
