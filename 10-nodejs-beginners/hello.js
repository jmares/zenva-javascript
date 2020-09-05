var http = require('http');
var moment = require('moment');

function serverCallback(req, res) {
    let begin_time = moment("10:00", "HH:mm");
    let end_time = moment("18:00", "HH:mm");
    let message = "Hello " + process.argv[2] + "\n";
    message += "Welcome to our page. \n";
    message += "Now, it is " + moment().format("HH:mm:ss") + ".\n";
    message += "Our business ours are from " + begin_time.format("HH:mm") + " to " + end_time.format("HH:mm") + "\n";

    let begin_diff = begin_time.diff(moment(), 'minutes');
    let end_diff = moment().diff(end_time, 'minutes');
    //message += "Test begindiff " + begin_diff + " and end_diff " + end_diff + "\n";
    
    if (begin_diff > 0) {
        message += "Please come back in " + begin_diff + " minutes.\n";
    }
    if (end_diff > 0) {
        message += "Please come back tomorrow. You are " + end_diff + " minutes late.\n";
    }
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(message);
}

http.createServer(serverCallback).listen(8080);
