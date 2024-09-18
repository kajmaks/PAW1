const http = require('http');
const https = require('https');
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
    } else if (req.url === '/get_params') {
        /*
            Dla ścieżki /get_params wyświetl w konsoli Node.js parametry przekazane metodą GET.
            Parametry GET skonwertuj do tablicy i zapisz w pliku params_{timestamp}.json, gdzie timestamp to timestamp przyjęcia danych. Format danych to JSON.
            Zwróć ze ścieżki dane JSON o treści {'ok': 'ok'}
        */
    }
}).listen(3000);

