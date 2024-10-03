import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
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
});

export default router;
