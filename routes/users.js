var express = require('express');
var router = express.Router();
var i18n = require('i18n');
var filter = require('../plugin/filter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send('respond with a resource' + req.params.userId + "=====>"+ i18n.__({phrase:'hello world!', locale:"zh-CN"}));
});

module.exports = router;
