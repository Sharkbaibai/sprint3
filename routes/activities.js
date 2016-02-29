var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a testss resource');
});

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send('respond with a testss resource ' + req.params.userId);
});

module.exports = router;
