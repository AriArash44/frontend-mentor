import express from 'express';
import cors from 'cors';
import qa from "./consts/QA.json" with { type: "json" };

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/qa', async (req, res) => {
    try {
        res.send(qa);
    } catch (error) {
        res.status(500).json({ error: 'A server error happened' });
    }
});

export default app;