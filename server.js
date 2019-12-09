var express = require('express');
var expressHandlebars = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars( { defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next) {
    res.status(200).render('index');
});

app.use(express.static('public'));

app.get('*', function(req, res) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server is listening on port ", port);
});