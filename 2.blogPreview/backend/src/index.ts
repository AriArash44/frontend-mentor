import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import preferenceRouter from './routes/userPreferences.js' ;
import authenticationRouter from './routes/userAuthentication.js';
import setupWebSocket from './websocket.js';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { allowedOrigins } from './consts/allowedOrigin.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use('/api/userPreferences', preferenceRouter);
app.use('/api/authentication', authenticationRouter);
const server = http.createServer(app);
const wss = setupWebSocket(server);

// app.use('/api/userPreferences', preferenceRouter);
// app.use('/api/authentication', authenticationRouter);

// const httpsServer = https.createServer(
//     {
//         key: fs.readFileSync('../localhost-key.pem'),
//         cert: fs.readFileSync('../localhost-cert.pem'),
//     },
//     app
// );

server.listen(PORT, () => {
  console.log(`Server (HTTP and WebSocket) running on port ${PORT}`);
});