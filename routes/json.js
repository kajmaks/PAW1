import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const data = { message: 'JSON', success: true };
    res.json(data);
});

export default router;
