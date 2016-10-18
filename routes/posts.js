'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')

router.get(`/`, function(req, res) {
  db.getPosts().then(posts => {
    res.render(`posts/all`, {title: `This Developer's Life: All Posts`, posts: posts})
  })
})

router.get(`/new`, function(req, res) {
  db.getUsers().then(users => {
    res.render(`posts/new`, {title: `This Developer's Life: Write a Post`, users: users})
    console.log(users);
  })
})

router.get(`/:id`, function(req, res) {
  db.getPost(req.params.id).then(post => {
    db.getUsers().then(users => {
      res.render(`posts/one`, {title: `This Developer's Life: ` + post.title, post: post, users: users})
    })
  })
})

// router.post('/', function(req, res) {
//   db.createPost(req.body).then(post => {
//     console.log(req.body)
//     res.redirect(`/posts`)
//   })
// })




router.post('/', function(req, res) {
  db.createPost(req.body).then(() => {
    res.redirect('/')
  })
})

// router.post(`/`, function(req, res) {
//   console.log(req.body);
//   db.createPost(req.body).then(() => {
//     res.redirect(`/posts`)
//   })
// })

router.get(`/:id/edit`, function(req, res) {
  db.getPost(req.params.id).then(post => {
    res.render(`posts/edit`, {title: `This Developer's Life: ` + post.title, post: post})
  })
})

router.put(`/:id`, function(req, res) {
  db.updatePost(req.params.id).then(() => {
    res.redirect(`/`)
  })
})

router.delete(`/:id`, function(req, res) {
  db.deletePost(req.params.id).then(() => {
    res.redirect(`/`)
  })
})

module.exports = router
