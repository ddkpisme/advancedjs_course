var http = require("http");
var fs = require('fs');
const os = require('os');
const qs = require('querystring');
// no need to put .js because modules by definition need to be in JS
const lists = require('./list');


http.createServer(function(req,res) {
    //Split gives you an array with two items in it
    let url = req.url.split("?");  // seperate route from query string
    let params = qs.parse(url[1]); // convert query string to object
    let path = url[0].toLowerCase();
  switch(path){
   case '/':
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./myhtml/home.html').pipe(res);
        break;
    case '/about': 
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./myhtml/about.html').pipe(res);
        break;
//node has a module called query string**
//Create search ability
//get information from array
    case '/get':
        let found = lists.get(params.title);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Results for ' + params.title + os.EOL + os.EOL + JSON.stringify(found));
        break;
//remove information from the array
//Also display remaining information
    case '/delete':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let removeMe = lists.del(params.title);
        res.end(params.title + " removed " + os.EOL + os.EOL + "Number of Books Remaining: " + removeMe);
        console.log(params.title + " removed " + os.EOL + os.EOL + "Number of Books Remaining: " + removeMe);
        break;
//add support for new titles being added to array
//not able to delete ATM need regex
    case '/add':
        let putMe = lists.ad(params.title);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("You added: " + params.title + " to the book list." + os.EOL + os.EOL + "Our new book count is: " + putMe);
        console.log("User added books to the array" + os.EOL + os.EOL + "Book Title: " + params.title + os.EOL + "Book Count: " + putMe);
        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream('./myhtml/404.html').pipe(res);
        break;
 }
}).listen(process.env.PORT || 3000);

console.log('Server running at http://127.0.0.1:3000');