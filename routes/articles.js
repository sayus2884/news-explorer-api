const router = require('express').Router();

const { getArticles, createArticle } = require('../controllers/articles');

router.get('/articles', getArticles)
router.post('/articles', createArticle)

module.exports = router;
