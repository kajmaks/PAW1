const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/') {
        res.end('Strona glowna');
    } else if (req.url === '/json') {
        res.setHeader('Content-Type', 'application/json');
        const data = { message: 'JSON', success: true };
        res.end(JSON.stringify(data));
    } else if (req.url === '/html') {
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>cos</title>
            </head>
            <body>
                <h1>COS</h1>
                <p>cos</p>
            </body>
            </html>
        `);
    } else if (req.url === '/htmlfile') {
        fs.readFile('cos.html', (err, data) => {
            if (err) {
                res.end('error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
}).listen(3000);
