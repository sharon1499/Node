var http = require('http');
var path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');

app.get('/', function(req, res)
{
    res.render("index");
});

app.get('/About', function(req, res)
{
    res.send("<h1>About Page</h1>");
});

http.createServer(app).listen(port, function()
{

});