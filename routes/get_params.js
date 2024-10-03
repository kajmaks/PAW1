import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', (req, res) => {
    const q = req.query;
    const timestamp = Date.now();
    const file = `params_${timestamp}.json`;

    fs.writeFile(file, JSON.stringify(q, null, 2), (err) => {
        if (err) {
            console.error(err);
        }
    });

    res.json({ok:'ok'});
});

export default router;
