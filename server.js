'use strict'

var express = require('express');
var fs = require('fs');
var serve = process.env.PORT || 3000;
var parser = require('body-parser');
var app = express();

app.post('/:filename', parser.json(), function(req, res){
  var name = ('./docs/' + req.params.filename);
  var ws = fs.createWriteStream(name);
  ws.write(JSON.stringify(req.body));

  process.stdin.pipe(ws);
})

app.get('/:filename', function(req, res){
  var getFile = ('./docs/' + req.params.filename);
  var rs = fs.createReadStream(getFile);
  rs.read(JSON.parse(req.body));
  rs.pipe(res);
});

app.listen(serve, function(){
  console.log('your server is running sir.');
});
