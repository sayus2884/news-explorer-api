const router = require('express').Router();

const { getArticles } = require('../controllers/articles');

router.get('/articles', getArticles)

module.exports = router;
