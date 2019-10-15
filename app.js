const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", 'ejs');

app.get('/', function(req, res)
{
    res.send("Hello World");
});

app.get('/About', function(req, res)
{
    res.send("<h1>About Page</h1>");
});

app.listen(port, function()
{

});