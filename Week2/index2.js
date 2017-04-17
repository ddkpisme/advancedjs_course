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
        if (params.title === 'dune') {
            var index = lists.books.indexOf(lists.get("dune"));
            var rmv = lists.books.splice(index,1);
            count = lists.books.length;
            res.end(params.title + " Removed " + os.EOL + os.EOL + "Remaining books: " + count);
            console.log(JSON.stringify(rmv) + " Removed " + os.EOL + os.EOL + "Remaining books: " + count);
        }
        else if (params.title === 'it') {
            var index = lists.books.indexOf(lists.get("it"));
            var rmv2 = lists.books.splice(index,1);
            count = lists.books.length;
            res.end(params.title + " Removed " + os.EOL + os.EOL + "Remaining books: " + count);
            console.log(JSON.stringify(rmv2) + " Removed " + os.EOL + os.EOL + "Remaining books: " + count);
        }
        else if (params.title === 'moby dick') {
            var index = lists.books.indexOf(lists.get("moby dick"));
            var rmv3 = lists.books.splice(index,1);
            count = lists.books.length;
            res.end(params.title + " Removed " + os.EOL + os.EOL + "Remaining books: " + count);
            console.log(JSON.stringify(rmv3) + " Removed " + os.EOL + os.EOL + "Remaining books: " + count);
        }
        else {
            res.end("Missing Deleted Parameters!" + "Or no longer there!");
        }
        break;
//add support for new titles being added to array
//not able to delete ATM need regex
    case '/add':
        let putMe = params.title;
        let adding = lists.books.push(putMe);
        count = lists.books.length;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("You added: " + putMe + " to the book list." + os.EOL + os.EOL + "Our new book count is: " + count);
        console.log("User added books to the array" + os.EOL + os.EOL + "Book Title: " + putMe + os.EOL + "Book Count: " + count);
        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream('./myhtml/404.html').pipe(res);
        break;
 }
}).listen(process.env.PORT || 3000);

console.log('Server running at http://127.0.0.1:3000');