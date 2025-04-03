import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import preferenceRouter from './routes/userPreferences.js';
import authenticationRouter from './routes/userAuthentication.js';
import setupWebSocket from './websocket.js';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { allowedOrigins } from './consts/allowedOrigin.js';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 443;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

const wsServer = http.createServer(app);
setupWebSocket(wsServer);

app.use('/api/userPreferences', preferenceRouter);
app.use('/api/authentication', authenticationRouter);

const httpsServer = https.createServer(
    {
        key: fs.readFileSync('../localhost-key.pem'),
        cert: fs.readFileSync('../localhost-cert.pem'),
    },
    app
);

httpsServer.listen(PORT, () => {
    const baseUrl = `https://localhost:${PORT}`;
    console.log(`HTTPS server running on ${baseUrl}`);
});

// export default app;