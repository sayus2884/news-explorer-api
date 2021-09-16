const Articles = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getArticles = (req, res, next) => {
  const user = req.user._id;

  Articles.find({
    owner: user
  })
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
    .then((article) => res.send({
      _id: article._id,
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
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
