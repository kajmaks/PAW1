const http = require('http');
const fs = require('fs');
const url = require('url');

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
    } else if (req.url.startsWith('/get_params')) {
        res.setHeader('Content-Type', 'application/json');

        const q = url.parse(req.url, true).query;
        console.log('GET parameters:', q);

        const ob = Object.entries(q);

        const timestamp = Date.now();

        const file = `params_${timestamp}.json`;
        fs.writeFile(file, JSON.stringify(ob, null, 2), (err) => {
        if (err) {
            console.error(err); 
        }
        });

        res.end(JSON.stringify(ob));

    }
}).listen(3000);
