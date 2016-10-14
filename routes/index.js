var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `This Developer's Life` });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: `About Me` });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: `Sign Up` });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: `Log In` });
});

router.get('/readers', function(req, res, next) {
  res.render('readers', { title: `Readers` });
});

module.exports = router;
