`use strict`

var express = require('express');
var router = express.Router();
var db = require(`../db/api`);


router.get('/', function(req, res) {
  db.getUsers().then(users => {
    res.render(`users/all`, {title: `This Developer's Life`, users: users})
  })
})

router.get(`/new`,function(req, res) {
  res.render(`users/new`, {title: `Add a User`})
})

router.get(`/:id`, function(req, res) {
  db.getUser(req.params.id).then(user => {
    res.render(`users/one`, {title: `This Developer's Life: ` + user.first_name + ' ' + user.last_name, user: user})
  })
})

router.post(`/`, function(req, res) {
  // console.log(req.body);
  db.createUser(req.body).then(() => {
    res.redirect(`/users`)
  })
})

router.get(`/:id`, function(req, res) {
  db.updateUser(`users`, req.params.id).then(() => {
    res.redirect(`/`)
  })
})

router.delete(`/:id`, function(req, res) {
  db.deleteUser(`users`, req.params.id).then(() => {
    res.redirect(`/`)
  })
})

module.exports = router;
