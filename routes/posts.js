'use strict'

var express = require('express')
var router = express.Router()
// var db = require('../db/api')

router.get(`/`, function(req, res) {
  console.log('get');
})

router.post('/', function(req, res) {
    console.log('post')
})

module.exports = router
