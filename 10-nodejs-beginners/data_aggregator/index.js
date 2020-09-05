var http = require('http');
var request = require('request');
var fs = require('fs');
var csv = require('csv');
var url = require('url');
var create_html = require('./create_html.js')

var json_request_body = undefined;
var csv_request_body = undefined;
var html_content = undefined;

setInterval(function() {
    request('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, request, body) {
    json_request_body = body;
    });
    console.log('requesting json ...');
}, 2000);

setInterval(function() {
    request('https://www.data.brisbane.qld.gov.au/data/dataset/1e11bcdd-fab1-4ec5-b671-396fd1e6dd70/resource/3c972b8e-9340-4b6d-8c7b-2ed988aa3343/download/public-art-open-data-2020-08-20.csv', function(err, request, body) {
        csv.parse(body, function(err, data) {
            csv_request_body = data;
        });
    });
    console.log('requesting csv ...');
}, 2000);


http.createServer(function(req, res) {
    if (json_request_body && csv_request_body && html_content) {
        //res.writeHead(200, {'Content-Type': 'application/json'});
        //res.end(request_body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        let request_url = url.parse(req.url);
        switch (request_url.path) {
            case '/json':
                res.end(create_html.createHtmlFromJson(html_content, JSON.parse(json_request_body)));
                break;
            case '/csv':
                res.end(create_html.createHtmlFromCsv(html_content, csv_request_body));
                break;
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Nothing retrieved yet');
    }
}).listen(8080);

fs.readFile('./index.html', function(err, html) {
    if (err) {
        throw err;
    }
    html_content = html;
});