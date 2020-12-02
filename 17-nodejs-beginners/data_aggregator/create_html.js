exports.createHtmlFromJson = function (html_content, retrievedData) {
    let body_begin_index = html_content.indexOf('<body>');
    let body_end_index = html_content.indexOf('</body>');
    let string_until_body = html_content.slice(0, body_begin_index+6);
    let string_from_body = html_content.slice(body_end_index);

    let html_string = '<table>\n';
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

    html_string += '</table>\n';
    return string_until_body + html_string + string_from_body;
}

exports.createHtmlFromCsv = function (html_content, retrievedData) {
    let body_begin_index = html_content.indexOf('<body>');
    let body_end_index = html_content.indexOf('</body>');
    let string_until_body = html_content.slice(0, body_begin_index+6);
    let string_from_body = html_content.slice(body_end_index);

    let html_string = '<table>\n';
    html_string += '<tr>\n';
    retrievedData[0].forEach(function(attribute) {
        html_string += '<th>' + attribute + '</th>\n';
    });
    html_string += '</tr>\n';

    let data = retrievedData.slice(1);

    data.forEach(function(row) {
        html_string += '<tr>\n';
        row.forEach(function(cell) {
            html_string += '<td>' + cell + '</td>\n';
        });
        html_string += '</tr>\n';        
    });

    html_string += '</table>\n';
    return string_until_body + html_string + string_from_body;
}
