const router = require('express').Router();

router.get('/test', (req, res, next) => {
  res.send("test route")
})

module.exports = router;
