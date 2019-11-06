var path = require('path');
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var mongoose = require('mongoose');
const port = process.env.PORT || 5000;

//app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'client/build')));//pointing to ithe build directory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const Todo = require('./models/todo.model');
const mongoDB = 'mongodb+srv://testConnection:b8RwqJYgo4hD1xhe@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'))
})

app.get('/api', function  (req, res) {
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            res.json({"results" : todo});
        }
    });
});

app.post('/api', function  (req, res) {
    let newTodo = new Todo({
        item: req.body.newtask,
        done: false
    });
    newTodo.save(function(err, todo){
        if (err){
            res.json({"Error: ":err})
        }else{
            res.json({"Status: ": "Successful", "ObjectId": todo.id})
        }

    });

});

app.put('/api', function  (req, res)  {
    var id = req.body.check;
    var error = {};
    if(typeof id === "string"){
        Todo.updateOne({_id: id},{done: true}, function(err){
            if (err){
                error = {"Error: ":err};
            }
        });
    }else if (typeof id === "object"){
        for(var i = 0; i < id.length; i++){
            Todo.updateOne({_id: id[i]},{done: true}, function(err){
            if (err){
                error = {"Error: ":err};
            }
        });
        }
    }
    if(error){
        res.json(error);
    }else{
        res.json({"Status: ": "Successful"})
    }
});

app.delete("/api", function  (req, res) {
    var deleteTask = req.body.delete;
    var error = {};
    if(typeof deleteTask === "string"){
        Todo.deleteOne({_id: deleteTask}, function(err){
            if (err){
                error = {"Error: ":err};
            }
        });
    }else if (typeof deleteTask === "object"){
        for(var i = 0; i < deleteTask.length; i++){
            Todo.deleteOne({_id: deleteTask}, function(err){
            if (err){
                error = {"Error: ":err};
            }
        });
        }
    }
    if(error){
        res.json(error);
    }else{
        res.json({"Status: ": "Successful"})
    }
});

app.listen(port, function(){
});