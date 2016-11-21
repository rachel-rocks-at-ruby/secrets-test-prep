var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var router = require('./routes');
var models = require('./db/models.js');

var app = express();

nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/secrets', router);

app.get('/', function (req, res) {
    res.redirect('/secrets');
});

models.Secret.sync()
  .then(function () {
      return models.Comment.sync();
  })
  .then(function () {
      app.listen(3000, function () {
          console.log('Server is listening on port 3000!');
      });
  });

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).render(err);
});
