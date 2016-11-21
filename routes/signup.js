var express = require('express');
var router = express.Router();
var knex = require(`../db/knex`)
var bcrypt = require(`bcrypt`)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next) {

  knex('users').where('user_name', req.body.user_name).then(function(results){
    if('user_name' === req.body.user_name) {
      res.render('error', {message: 'Username is already being used.'})
    } else {
      var user = req.body
      delete results.password
      var hash = bcrypt.hashSync(req.body.password, 12)
      console.log('hash is', hash);
      knex('users')
      .returning('*')
      .insert({user_name: user.user_name, first_name: user.first_name, last_name: user.last_name, password: hash})
      .then(function(results){
        req.session.userInfo = results
        res.redirect('/posts')
      })
    }
  })
})

module.exports = router;
