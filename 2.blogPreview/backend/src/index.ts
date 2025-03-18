import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import preferenceRouter from './routes/userPreferences.js';
import authenticationRouter from './routes/userAuthentication.js';
import setupWebSocket from './websocket.js';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app);
setupWebSocket(server);

app.use('/api/userPreferences', preferenceRouter);
app.use('/api/authentication', authenticationRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// export default app;