import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
const port = process.env.port || 3000;
const logging = process.env.logging || true;

const logToConsole = (message) => {
    if (logging) console.log(message);
};

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

    logToConsole(`[i] - file path: ${filePath}`);
    logToConsole(`[i] - content type: ${contentType}`);

    if (contentType) {
        response.writeHead(200, { 'Content-Type': contentType });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
        logToConsole(`[/] - successful\n`);
    } else {
        logToConsole(`[x] - failed\n`);
        logToConsole(`[!] - missing content type for extension ${ext}\n`);
    }
});

server.listen(port, (error) => {
    console.log(logging);
    if (error) {
        console.error(`[x] - ${error}\n`);
    } else {
        console.log(`listening on port ${port}...\n`);
    }
});
