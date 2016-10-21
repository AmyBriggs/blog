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
  console.log('logged out');
  req.session = null
  res.redirect(`/login`)
})

router.post(`/`, function(req, res, next) {
  console.log(req.body);
  knex(`users`).where(`user_name`, req.body.user_name).then(function(results){
    if(results.length == 0){
      res.render(`error`, {message: `Username or password incorrect`})
    } else {
      var user = results[0]
      var passwordMatch = bcrypt.compareSync(req.body.password, user.password)
      delete user.password
      if(passwordMatch == false) {
        console.log(req.body.password, user.password, req.session.userInfo);
        res.render(`error`, {
          message: `Username or password incorrect.`
        })
      } else {
        req.session.userInfo = user
        res.redirect(`/`)
      }
    }
  })
})

// router.post(`/signup`, function(req, res, next) {
//   knex(`users`).where(`user_name`, req.body.user_name).then(function(results) {
//     if(results.length >= 1) {
//       console.log(results);
//       res.render(`error`, {message: `Username is already taken.`})
//     } else {
//       var user = req.body
//       delete results.password
//       var hash = bcrypt.hashSync(req.body.password, 12)
//       knex(`users`)
//       .returning(`*`)
//       .insert({user_name: user.user_name, first_name: user.first_name, last_name: user.last_name, password: hash})
//       .then(function(results) {
//         console.log(results);
//         req.session.userInfo = results
//         res.redirect(`posts`)
//       })
//     }
//   })
// })

module.exports = router;
