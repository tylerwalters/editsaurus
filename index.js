var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname, 'dist'));
app.all(/^\/dist$/, function(req, res) { res.redirect('/dist/'); });

app.use('/',express.static(__dirname+'/dist'));

var server = app.listen(port, function() {
	console.log('Listening on port ' + port);
});
