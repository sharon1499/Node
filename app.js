var http = require('http');
var path = require('path');
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ encoded: true}));

var task = ["bark", "meow"];

app.get('/', function(req, res)
{
    res.render("index");
});

app.post('/addTask', function(req, res)
{
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

http.createServer(app).listen(port, function()
{

});