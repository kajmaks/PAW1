const express = require('express');
const path = require('path');
const app = express();
const PORT = 3005;

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')));

const index = require('./routes/index');
const oNas = require('./routes/o-nas');
const oferta = require('./routes/oferta');
const kontakt = require('./routes/kontakt');

app.use('/', index);
app.use('/o-nas', oNas);
app.use('/oferta', oferta);
app.use('/kontakt', kontakt);

app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});

module.exports = app;
