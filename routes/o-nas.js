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
            <title>O nas</title>
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
                <h1>O firmie</h1>
                <p>Lorem ipsum</p>
                <div class="slider">
                    <div class="slides">
                        <div class="slide"><img src="../static/cos1.jpg" alt="cos1"></div>
                        <div class="slide"><img src="../static/cos2.jpg" alt="cos2"></div>
                        <div class="slide"><img src="../static/cos3.jpg" alt="cos3"></div>
                    </div>
                    <button class="prev">&#10094;</button>
                    <button class="next">&#10095;</button>
                </div>
            </main>
            <footer>
                <p>Maksymilian Janicki 4c</p>
            </footer>
        </body>
        </html>

        <script>
            let currentSlide = 0;
            const slides = document.querySelectorAll('.slide');
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');

            function showSlide(index) {
                if (index >= slides.length) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = slides.length - 1;
                } else {
                    currentSlide = index;
                }

                slides.forEach((slide, i) => {
                    slide.style.display = i === currentSlide ? 'block' : 'none';
                });
            }

            function moveSlide(direction) {
                showSlide(currentSlide + direction);
            }

            prevButton.addEventListener('click', () => moveSlide(-1));
            nextButton.addEventListener('click', () => moveSlide(1));

            document.addEventListener('DOMContentLoaded', () => {
                showSlide(currentSlide);
            });
        </script>
    `);
});

module.exports = router;
