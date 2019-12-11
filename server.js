var express = require('express');
var expressHandlebars = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

var prompts = require('./prompts')

app.engine('handlebars', expressHandlebars( { defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res, next) {
    res.status(200).render('index');
});

app.get('/budget', function(req, res, next) {
    res.status(200).render('budget');
});

app.get('/budget/:promptNumber', function(req, res, next) {
    if (req.params.promptNumber >= 1 && req.params.promptNumber <= prompts.length) {
        res.status(200).render('./partials/modal', prompts[req.params.promptNumber]);
    } else {
        next();
    }
});

app.get('*', function(req, res) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server is listening on port ", port);
});