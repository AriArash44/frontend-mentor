import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userPreferencesRoutes from './routes/userPreferences';
import setupWebSocket from './websocket';
import http from 'http';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/userPreferences', userPreferencesRoutes);

const server = http.createServer(app);
setupWebSocket(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
