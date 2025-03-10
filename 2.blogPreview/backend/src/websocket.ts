import { Server } from 'http';
import { WebSocketServer } from 'ws';

const setupWebSocket = (server: Server) => {
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.on('message', (message) => {
            console.log(`Received message => ${message}`);
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === 1) {
                    client.send(message);
                }
            });
        });
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
    return wss;
};

export default setupWebSocket;