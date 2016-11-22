'use strict'

var express = require('express')
var router = express.Router()
var db = require('../db/api')



router.get('/', function(req, res) {
  db.getAll('comments').then(comments => {
    res.render('comments/all', {title: 'Comments', comments: comments})
  })
})

router.get('/new', function(req, res) {
  res.send('/posts/:id/comments/new')
  console.log(`meow`);
  res.render(`/posts/:id/`)
})

router.get('/:id', function(req, res) {
  db.getUser(req.params.id).then(comment => {
    console.log('comment', comment)
    res.render('comments/one', {comment: comment})
  })
})

router.post('/', function(req, res) {
  db.createComment('comments').then(comment => {
    console.log('comment', comment)
    res.redirect('/')
  })
})

router.get('/:id/edit', function(req, res) {
  res.render('/comments/edit')
})

router.put('/:id', function(req, res) {
  db.updateComment('comments', req.params.id).then(comment => {
    console.log('comment', comment)
    res.redirect('/')
  })
})

router.delete('/:id', function(req, res) {
  db.deleteComment('comments', req.params.id).then(comment => {
    console.log('comment', comment)
    res.redirect('/')
  })
})

module.exports = router
