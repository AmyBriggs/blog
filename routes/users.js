`use strict`

var express = require('express');
var router = express.Router();
var db = require(`../db/api`);

let authorizeEditUser = (req, res, next) => {
    console.log('req.session.userInfo =', req.session.userInfo);
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to edit a user."
        });
    }
    next();
}


router.get('/', function(req, res) {
  db.getUsers().then(users => {
    res.render(`users/all`, {title: `This Developer's Life: All Users`, users: users})
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
  db.createUser(req.body).then(() => {
    res.redirect(`/users`)
  })
})

// authorize function for editing a user



router.get(`/:id`, authorizeEditUser, function(req, res) {
  console.log('userInfo is', req.session.userInfo);
  db.updateUser(`users`, req.params.id).then(() => {
    res.redirect(`/`)
  })
})

// authorize function for deleting a user

router.delete(`/:id`, function(req, res) {
  db.deleteUser(`users`, req.params.id).then(() => {
    res.redirect(`/`)
  })
})

module.exports = router;
