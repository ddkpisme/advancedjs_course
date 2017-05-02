const express = require("express");
const app = express();
const lists = require('./list');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


// send static file as response
app.get('/', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/views/home.html'); 
});

// send content of 'home' view
app.get('/about', function(req,res){
 //let result = lists.get(req.query.title);
 //res.sendFile(__dirname + '/views/about.html');
 res.render('about', {title: "Dune", result: "is great!" });
});

// send plain text response
/*app.get('/about', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/myhtml/about.html');
}); */

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started at ' + ' http://localhost:3000'); 
});