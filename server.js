const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const extTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.ts': 'text/typescript',
};

const server = http.createServer((request, response) => {
    let filePath = path.join(
        './src/',
        request.url === '/' ? 'index.html' : request.url
    );

    let ext = path.extname(filePath);
    let contentType = extTypes.hasOwnProperty(ext) && extTypes[ext];

    console.debug(`file path: ${filePath}`);
    console.debug(`content type: ${contentType}`);

    if (contentType) {
        response.writeHead(200, { 'Content-Type': contentType });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
        console.debug(`successful [✔]\n`);
    } else {
        console.debug(`failed [✖]\n`);
        console.warn(
            `warning: missing content type for file extension '${ext}'\n`
        );
    }
});

server.listen(port, (error) => {
    if (error) {
        console.error(`error: ${error}\n`);
    } else {
        console.log(`listening on port ${port}...\n`);
    }
});
