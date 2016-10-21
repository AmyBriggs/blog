var express = require('express');
var router = express.Router();
var users = require(`./users`);
var posts = require(`./posts`);
var login = require(`./login`);
var comments = require(`./comments`)
var bcrypt = require(`bcrypt`)

router.get(`/`, function(req, res) {
  res.redirect(`/posts`)
  console.log(`Hey Amy`);
})

router.use(`/users`, users);
router.use(`/posts`, posts);
router.use(`/users/:id/posts`, posts);
router.use(`/posts/:id/comments`, comments);
router.use(`/users/:id/comments`, comments);


module.exports = router;
