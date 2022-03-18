// const http = require('http');
import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
// const path = require('path');
// const fs = require('fs');
const port = 3000;

const extToType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.ttf': 'application/x-font-ttf',
    '.png': 'image/png',
};

const server = http.createServer((request, response) => {
    const filePath = path.join(
        './src/',
        request.url === '/' ? 'index.html' : request.url
    );

    const ext = path.extname(filePath);
    const contentType = extToType.hasOwnProperty(ext) && extToType[ext];

    console.info(`[i] - file path: ${filePath}`);
    console.info(`[i] - content type: ${contentType}`);

    if (contentType) {
        response.writeHead(200, { 'Content-Type': contentType });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
        console.log(`[/] - successful\n`);
    } else {
        console.error(`[x] - failed\n`);
        console.warn(`[!] - missing content type for extension ${ext}\n`);
    }
});

server.listen(port, (error) => {
    if (error) {
        console.error(`[x] - ${error}\n`);
    } else {
        console.log(`listening on port ${port}...\n`);
    }
});
