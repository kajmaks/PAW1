import express from 'express';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import indexRoute from './routes/index.js';
import jsonRoute from './routes/json.js';
import htmlRoute from './routes/html.js';
import { fileURLToPath } from 'url';
import htmlfileRoute from './routes/htmlfile.js';
import getParamsRoute from './routes/get_params.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', indexRoute);
app.use('/json', jsonRoute);
app.use('/html', htmlRoute);
app.use('/htmlfile', htmlfileRoute);
app.use('/get_params', getParamsRoute);

app.use((req, res) => {
  const type = mime.getType(req.url);
  const filePath = path.join(__dirname, 'assets', req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).json({ error: 404 });
    } else {
      res.setHeader('Content-Type', type);
      res.end(data);
    }
  });
});

export default app