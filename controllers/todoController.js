var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database


//Create a schema (blueprint)
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
 
module.exports = function(app) {

// Get data from mongoDB and pass it to the view
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });  
    });

// Get data from the view and add it to mongoDB
    app.post('/todo', urlencodedParser, function(req, res) {
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

// Delete the requested item from mongoDB
    app.delete('/todo/:item', function(req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });  
    });

};