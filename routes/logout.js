`use strict`

var express = require('express');
var router = express.Router();
var db = require('../db/api')
var knex = require(`../db/knex`)
var bcrypt = require('bcrypt')

router.get(`/`, function(req, res, next) {
  console.log('logged out');
  req.session = null
  res.redirect(`/login`)
})

module.exports = router;
