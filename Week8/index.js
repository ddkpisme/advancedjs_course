//Requirements
const express = require("express");
const app = express();
const os = require('os');
const lists = require('./js_modules/list');
const bp = require('body-parser');
const handlebars =  require("express-handlebars");
var Book = require("./models/bookdb");



app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Start with Home Page
app.get('/', (req,res) => {
    Book.find((err,books) => {
        if (err) return next(err);
        res.render('home', {books: JSON.stringify(books) });    
    })
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});


// api's

app.get('/api/v1/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/books', (req,res, next) => {
    Book.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});


app.get('/api/v1/delete/:title', (req,res, next) => {
    Book.remove({"title":req.params.title }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});



app.get('/api/v1/add/:title/:author/:pubdate', (req,res, next) => {
    //
    // find & update existing item, or add new 
    let title = req.params.title;
    Book.update({ title: title}, {title:title, author: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.post('/api/v1/add/', (req,res, next) => {
    let title = req.body.title;
    Book.update({ title: title}, {title:title, author: req.body.author, pubdate: req.body.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err); 
        console.log(req.body);   
        // nModified = 0 for new item, = 1+ for updated item 
    });
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