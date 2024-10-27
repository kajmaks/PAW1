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
            <title>Kontakt</title>
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
                <h1>Kontakt</h1>
                <form action="/kontakt" method="POST">
                    <label for="fname">Imię:</label><br>
                    <input type="text" id="fname" name="fname" required><br>
                    <label for="lname">Nazwisko:</label><br>
                    <input type="text" id="lname" name="lname" required><br>
                    <label for="email">Email:</label><br>
                    <input type="email" id="email" name="email" required><br>
                    <label for="message">Treść wiadomości:</label><br>
                    <textarea id="message" name="message" required></textarea><br>
                    <input type="submit" value="Wyślij">
                </form>
            </main>
            <footer>
                <p>Maksymilian Janicki 4c</p>
            </footer>
        </body>
        </html>
    `);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
