var express = require('express');
var app = express();

app.use(express.static(__dirname, 'dist'));
app.all(/^\/dist$/, function(req, res) { res.redirect('/dist/'); });

app.use('/',express.static(__dirname+'/dist'));

var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});