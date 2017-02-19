var bodyParser=require('body-parser');

var mongoose=require('mongoose');

mongoose.connect("mongodb://test:test@ds031925.mlab.com:31925/todo");

var todoSchema=new mongoose.Schema({
item : String
});

var Todo=mongoose.model('Todo',todoSchema);

//var data=[{item:'get milk'},{item:'study tutorials'},{item:'get mark'},{item:'brush teeth'}];

var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo',function(req,res){
    //get data from mongodb
    Todo.find({},function(err,data){
        if(err) 
        throw err;
        res.render('todo',{todos: data}); 

    });
   
});
app.post('/todo',urlencodedParser,function(req,res){
    //get data from view to add it to db
var newTodo= Todo(req.body).save(function(err,data){
    if(err) throw err;
res.json(data);

})
});
 
 


app.delete('/todo/:item',function(req,res){
    //delete from mongo db
Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
if(err) throw err;
res.json(data);
});
   
});

};