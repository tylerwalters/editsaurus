var express = require('express');
var app = express();
var port = process.env.PORT || 7070;

app.use('/',express.static(__dirname + '/dist'));

var server = app.listen(port, function() {
	console.log('Write Check now running.');
	console.log('Listening on port ' + port + '.');
});
