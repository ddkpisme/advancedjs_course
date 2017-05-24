//Requirements
const express = require("express");
const app = express();
const os = require('os');
const lists = require('./list');
const qs = require('querystring');
const bp = require('body-parser');
const handlebars =  require("express-handlebars");
var Book = require("./models/bookdb");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


//Home page
app.get('/', function(req,res){
 res.type('text/html');
 res.locals.json_data = Book.find({});
 Book.find({}, function (err, item) {
    if (err) return next(err);
    //console.log(item);
   res.render(__dirname + '/views/home.html', {bookTitle: item});
});
});

//About Page  
app.get('/about', function(req,res){
 res.sendFile(__dirname + '/views/about.html');
});

//Get information from module array
app.get('/get', function(req,res){
    let result = req.query.title;
    Book.findOne({'title': result}, function (err, item) {
    if (err) return next(err);
    console.log(item + "It's my get!");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Results for ' + req.query.title + os.EOL + os.EOL + result);  // other code here
});
});

//add a get-post for query form data
app.post('/get', function(req,res){
    var header = 'Searching for: ' + req.body.booktitle + '<br>';
    var found = req.body.booktitle;
    Book.findOne({'title': found}, function (err, item) {
    if (err) return next(err);
    console.log(item + "It's my post!");
    res.render("aboutQ", {name: "Book Title: ", 
    title: item.title, result: item});
  // other code here
});
});


//Delete information from the module array
app.get('/delete', function(req,res){
    var collection = Book.find({});
    let removeMe = req.query.title;
    collection.remove({'title': removeMe}, function (err, item) {
    if (err) return next(err);
    console.log(item + "It's my delete!");
    res.render('aboutD', {title: item.title, result: item});
  // other code here
});
});


//add information from the module array
//add information from the module array
app.get('/add', function(req,res){
   var newBook = {
        title: req.query.title,
        author: "Dylan Patterson",
        pubdate: "2017"
    };
    var putMe = lists.ad(newBook);

    if (!putMe) {
        res.send("Book is already there!");
    }
    else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("You added: " + req.query.title + " to the book list." + os.EOL + os.EOL + "Our new book count is: " + putMe);
    console.log("User added books to the array" + os.EOL + os.EOL + "Book Title: " + JSON.stringify(newBook) + os.EOL + "Book Count: " + putMe);
}
});

//Allow user to add on home page

app.post('/add', function(req,res){
    var newBook = {
        title: req.body.addBook,
        author: "Dylan Patterson",
        pubdate: "2017"
    };
    let putMe = lists.ad(newBook);
    if (!putMe) {
        res.send("Book is already there!");
    }
    else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("You added: " + req.body.addBook + " to the book list." + os.EOL + os.EOL + "Our new book count is: " + putMe);
    console.log("User added books to the array" + os.EOL + os.EOL + "Book Title: " + JSON.stringify(newBook) + os.EOL + "Book Count: " + putMe);
}
});


// define 404 handler
app.use(function(req,res) {
 res.status(404);
 res.type('text/html');
 res.sendFile(__dirname + '/views/404.html');
 console.log('This is a 404 Error');
});


app.listen(app.get('port'), function() {
 console.log('Express started at ' + ' http://localhost:3000'); 
});