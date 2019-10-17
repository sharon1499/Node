var http = require('http');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ encoded: true}));

var task = ["bark", "meow"];
var complete = ["eat", "sleep"];

app.get('/', function(req, res)
{
    res.render("index", {task:task, complete:complete});
});

app.post('/addtask', function(req, res)
{
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

app.post('/removetask', function(req, res)
{
    var completeTask = req.body.check;
    if(typeof completeTask === "string")
    {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    }
    else if(typeof completeTask === "object")
    {

    }
    res.redirect('/');
});

http.createServer(app).listen(port, function()
{

});