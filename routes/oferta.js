const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../static/style.css">
            <title>Oferta</title>
        </head>
        <body>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Strona główna</a></li>
                        <li><a href="/o-nas">O nas</a></li>
                        <li><a href="/oferta">Oferta</a></li>
                        <li><a href="/kontakt">Kontakt</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Oferta</h1>
                <p>Lorem ipsum dolor sit amet...</p>
                <table>
                    <tr>
                        <th>Usługa</th>
                        <th>Cena</th>
                    </tr>
                    <tr>
                        <td>Strona WWW</td>
                        <td>1000 zł</td>
                    </tr>
                    <tr>
                        <td>Coś innego wymyśl sobie</td>
                        <td>500 zł</td>
                    </tr>
                </table>
            </main>
            <footer>
                <p>Maksymilian Janicki 4c</p>
            </footer>
        </body>
        </html>
    `);
});

module.exports = router;
