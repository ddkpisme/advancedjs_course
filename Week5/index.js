//Requirements
const express = require("express");
const app = express();
const os = require('os');
const lists = require('./list');
const qs = require('querystring');
const bp = require('body-parser');
const handlebars =  require("express-handlebars");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

/* //Split gives you an array with two items in it
    let url = req.url.split("?");  // seperate route from query string
    let params = qs.parse(url[1]); // convert query string to object
    let path = url[0].toLowerCase(); */

//Define url parameters


//Home page
app.get('/', function(req,res){
 res.type('text/html');
 res.locals.json_data = lists.all();
 res.render(__dirname + '/views/layouts/main.html', {bookTitle: ['dune', 'it', 'moby dick']});
});

//About Page  
app.get('/about', function(req,res){
 res.sendFile(__dirname + '/views/about.html');
});

//Get information from module array
app.get('/get', function(req,res){
    let result = lists.get(req.query.title);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Results for ' + req.query.title + os.EOL + os.EOL + JSON.stringify(result));
});

//add a get-post for query form data
app.post('/get', function(req,res){
    console.log(req.body)
    var header = 'Searching for: ' + req.body.booktitle + '<br>';
    var found = lists.get(req.body.booktitle);
    res.render("aboutQ", {name: "Book Title: ", 
        title: req.body.booktitle, result: found});
});


//Delete information from the module array
app.get('/delete', function(req,res){
    let removeMe = lists.del(req.query.title);
    res.render('aboutD', {title: req.query.title, result: removeMe});
});


//add information from the module array
app.get('/add', function(req,res){
    let putMe = lists.ad(req.query.title);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("You added: " + req.query.title + " to the book list." + os.EOL + os.EOL + "Our new book count is: " + putMe);
    console.log("User added books to the array" + os.EOL + os.EOL + "Book Title: " + req.query.title + os.EOL + "Book Count: " + putMe);
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