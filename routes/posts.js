'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')
var knex = require(`knex`)

let authorize = (req, res, next) => {
    console.log('req.session.userInfo =', req.session.userInfo);
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to write a new post."
        });
    }
    next();
}

router.get(`/`, function(req, res) {
  db.getPosts().then(posts => {
    console.log(posts, 'these are the posts');
    res.render(`posts/all`, {title: `This Developer's Life: All Posts`, posts: posts})
    // res.send(posts)
  })
})


router.get(`/new`, authorize, function(req, res) {
  db.getUsers().then(users => {
    console.log('user', req.session.userInfo);
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
  console.log(req.session.userInfo, "Elana");
  var post = {
    title: req.body.title,
    body: req.body.postBody,
    img_url: req.body.postImage,
    user_id: req.session.userInfo.id
  }
  db.createPost(req.body).then(post => {
    console.log('it posted', req.body)
    res.redirect(`/posts`)
  })
})

let authorizeEdit = (req, res, next) => {
    console.log('req.session.userInfo =', req.session.userInfo);
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
  db.updatePost(req.params.id).then(() => {
    res.redirect(`/`)
  })
})


let authorizeDelete = (req, res, next) => {
    console.log('req.session.userInfo =', req.session.userInfo);
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
