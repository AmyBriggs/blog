`use strict`

var express = require('express');
var router = express.Router();
var db = require('../db/api')
var knex = require(`../db/knex`)
var bcrypt = require('bcrypt')

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('login');
});

router.get(`/logout`, function(req, res, next) {
  req.session = null
  res.redirect(`/login`)
})

router.post(`/`, function(req, res, next) {
  knex(`users`).where(`user_name`, req.body.user_name).then(function(results){
    if(results.length == 0){
      res.render(`error`, {message: `Username or password incorrect`})
    } else {
      var user = results[0]
      // var passwordMatch = bcrypt.compareSync(req.body.password, user.password)
      // delete user.password
      if(req.body.password !== user.password) {
        res.render(`error`, {
          message: `Username or password is freaking incorrect.`
        })
      } else {
        req.session.userInfo = user
        res.redirect(`/`)
      }
    }
  })
})


module.exports = router;
