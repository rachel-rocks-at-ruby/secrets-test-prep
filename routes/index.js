var express = require('express');
var router = express.Router();
var models = require('../db/models.js');
var Secret = models.Secret;
var Comment = models.Comment;


router.get('/', function(req, res, next) {
  Secret.findAll()
        .then(function (secrets) {
            res.render('index', {
                secrets: secrets
            });
        })
        .catch(next);
})

router.get('/add', function(req, res, next) {
  res.render('add');
})

router.post('/', function(req, res, next) {
  Secret.create({
          secret: req.body.text
      })
      .then(function (createdSecret) {
        res.redirect('/secrets');
      })
      .catch(next);
})

// display secrets by secret id
// display comments by secretid
router.get('/:secretId', function(req, res, next) {

  Secret.findById(
    req.params.secretId, { include: [Comment] }
  )
  .then(function(foundSecret) {
    res.render('secret', {
      secret: foundSecret
    })
  })
  .catch(next);
})

router.post('/:secretId/comments', function(req, res, next) {

  Comment.create({
    comment: req.body.text,
    secretId: req.params.secretId
  })
  .then(function(createdComment) {
    res.redirect(`/secrets/${req.params.secretId}`)
  })
})

module.exports = router;
