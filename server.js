/*jshint node: true */
"use strict";

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use('/', express.static(__dirname + '/app'));
app.use(express.static(__dirname, 'app'));

var server = app.listen(port, function () {
	console.log('Listening on port ' + port);
});