'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')
var knex = require(`knex`)

router.get(`/`, function(req, res) {
  db.getPosts().then(posts => {
    console.log(posts, 'these are the posts');
    res.render(`posts/all`, {title: `This Developer's Life: All Posts`, posts: posts})
    // res.send(posts)
  })
})

// router.get(`/`, function(req, res) {
//   return knex(`posts`)
//     .join(`users`, `posts.user_id`, `users.id`)
//     console.log('got this far');
//     .select(`posts.id as postId`, `users.id as userId`, `users.user_name as user_name`, `posts.title as title`, `posts.body as postBody`,
//     `posts.img_url as postImage`)
//     .then(posts => {
//       res.render(`posts/all`)
//     })
//     console.log('these are the posts');
// })

router.get(`/new`, function(req, res) {
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

router.post('/', function(req, res) {
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



//
// router.post('/', function(req, res) {
//   var newPost = {
//     user_name: req.session.userInfo.user_name,
//   }
//   return newPost;
//   console.log(newPost);
//   db.createPost().then(() => {
//     console.log('posted');
//     res.redirect('/')
//   })
// })

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
