var fs = require('fs');

exports.updateLogFile = function (message) {
    fs.readFile('./log.txt', function (err, logContent) {
        if (err) throw err;

        logContent = logContent + "";

        let lines = logContent.split("\n");

        let firstLine = lines[0];
        let accessCounterIndex = firstLine.indexOf(':');
        let numberOfAccesses = parseInt(firstLine.slice(accessCounterIndex + 2));
        lines[0] = 'Number of accesses: ' + (numberOfAccesses + 1);
        let newLogContent = lines.join('\n') + message + '\n';
        fs.writeFile('./log.txt', newLogContent, function(err) {
            if (err) throw err;
        })
    });
}