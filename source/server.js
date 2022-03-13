var http = require('http');
var fs = require('fs');

function onRequest(request, response) {
    fs.readFile('./index.html', function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('index.html not found...');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(8000);
