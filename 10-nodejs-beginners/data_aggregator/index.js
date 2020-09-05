var http = require('http');
var request = require('request');

var request_body = undefined;

function createHtmlFromJson(retrievedData) {
    let html_string = '<html>\n<head>\n\t<title>Data aggregator</title>\n</head>\n<body>\n<table>\n';

    html_string += '<tr>\n';
    for (let attribute in retrievedData[0]) {
        if (typeof retrievedData[0][attribute] !== 'object') {
            html_string += '<th>' + attribute + '</th>\n';
        }
    }
    html_string += '</tr>\n';
    retrievedData.forEach(function(object) {
        html_string += '<tr>\n';
        for (let attribute in object) {
            if (typeof object[attribute] !== 'object') {
                html_string += '<td>' + object[attribute] + '</td>\n';
            }
        }
        html_string += '</tr>\n';        
    });

    html_string += '</table>\n</body>\n</html>';
    return html_string;
}

request('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, request, body) {
    request_body = body;
});

http.createServer(function(req, res) {
    if (request_body) {
        //res.writeHead(200, {'Content-Type': 'application/json'});
        //res.end(request_body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(createHtmlFromJson(JSON.parse(request_body)));
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Nothing retrieved yet');
    }
}).listen(8080);