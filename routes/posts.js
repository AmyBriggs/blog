'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')
var knex = require(`knex`)

let authorize = (req, res, next) => {
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to write a new post."
        });
    }
    next();
}

router.get(`/`, function(req, res) {
  db.getPosts().then(posts => {
    res.render(`posts/all`, {title: `This Developer's Life: All Posts`, posts: posts})
    // res.send(posts)
  })
})


router.get(`/new`, authorize, function(req, res) {
  db.getUsers().then(users => {
    res.render(`posts/new`, {title: `This Developer's Life: Write a Post`})
  })
})

router.get(`/:id`, function(req, res) {
  db.getPost(req.params.id).then(post => {
    db.getUsers().then(users => {
      res.render(`posts/one`, {title: `This Developer's Life:` + post.title, post: post, users: users})
    })
  })
})

router.post('/', authorize, function(req, res) {
  // var post = {
  //   title: req.body.title,
  //   body: req.body.postBody,
  //   img_url: req.body.postImage,
  //   user_id: req.session.userInfo.id
  // }
  db.createPost(req.body).then(post => {
    res.redirect(`/posts`)
  })
})

let authorizeEdit = (req, res, next) => {
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to edit a post."
        });
    }
    next();
}

router.get(`/:id/edit`, authorizeEdit, function(req, res) {
  db.getPost(req.params.id).then(post => {
    res.render(`posts/edit`, {title: `This Developer's Life: ` + post.title, post: post})
  })
})

router.put(`/:id`, function(req, res) {
  console.log('made it this far');
  db.updatePost(req.params.id, req.body).then(() => {
    res.redirect(`/`)
  })
})


let authorizeDelete = (req, res, next) => {
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to delete a post."
        });
    }
    next();
}

router.delete(`/:id`, authorizeDelete, function(req, res) {
  db.deletePost(req.params.id).then(() => {
    res.redirect(`/`)
  })
})

module.exports = router
