const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/validation');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/articles', getArticles);
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl),
    image: Joi.string().required().custom(validateUrl)
  }),
}), createArticle);
router.delete('/articles/:articleId', celebrate({
  params: Joi.object({
    articleId: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

module.exports = router;
