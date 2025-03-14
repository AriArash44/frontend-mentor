import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const API_URL = 'http://api.qrserver.com/';

app.post('/api/qrcode', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}v1/create-qr-code/?format=svg&data=${req.body.qr_code_text}`, req.headers);
        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching QR code' });
    }
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("test");
export default app;