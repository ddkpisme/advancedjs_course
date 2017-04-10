var http = require("http");

var fs = require('fs');


http.createServer(function(req,res) {
  var path = req.url.toLowerCase();
   if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./myhtml/home.html').pipe(res);
    } else if (req.url === '/about') {
                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream('./myhtml/about.html').pipe(res);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                fs.createReadStream('./myhtml/404.html').pipe(res);
 
    }
}).listen(process.env.PORT || 3000);

console.log('Server running at http://127.0.0.1:3000');