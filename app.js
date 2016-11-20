var express = require('express');
var nunjucks = require('nunjucks');
// var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./routes')

var app = express();

nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
app.set('views', __dirname + 'views/');

// app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
  console.log('Awaiting orders on port 3000');
});

app.use(router);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).render(error);
});

module.exports = app;
