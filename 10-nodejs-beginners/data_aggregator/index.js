var http = require('http');
var request = require('request');

var request_body = undefined;

request('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, request, body) {
    request_body = body;
});

http.createServer(function(req, res) {
    if (request_body) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(request_body);
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Nothing retrieved yet');
    }
}).listen(8080);