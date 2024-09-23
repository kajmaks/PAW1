import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mime from 'mime';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        fs.readFile(`${__dirname}/cos.html`, (err, data) => {
            if (err) {
                res.end('error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (req.url.startsWith('/get_params')) {
        res.setHeader('Content-Type', 'application/json');

        const q = new URL(req.url, `http://${req.headers.host}`).searchParams;
        console.log('GET parameters:', q);

        const ob = [...q.entries()];

        const timestamp = Date.now();

        const file = `params_${timestamp}.json`;
        fs.writeFile(file, JSON.stringify(ob, null, 2), (err) => {
            if (err) {
                console.error(err);
            }
        });

        res.end(JSON.stringify(ob));
    } else {
        fs.readFile(`${__dirname}/assets/${req.url}`, (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 404;
                res.write(JSON.stringify({ error: 404}));
                res.end();
            } else {
                let type = mime.getType(req.url);
                res.setHeader('Content-Type', type);
                if (type === 'application/json'){
                    res.end(JSON.stringify(data));
                } else {
                    res.end(data);
                }
            }
        });

    }
}).listen(3000);