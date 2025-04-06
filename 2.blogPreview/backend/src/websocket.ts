import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import UserSocket from './types/userSocket.js';

const setupWebSocket = (server: Server) => {
    const wss = new WebSocketServer({ server });
    const userSockets: UserSocket = {};

    wss.on('connection', (ws: WebSocket, req) => {
        const username = new URLSearchParams(req.url?.split('?')[1]).get('username');
        if (!username) {
            ws.close(4001, 'Username is required');
            return;
        }
        console.log(`New client connected for username: ${username}`);
        if (!userSockets[username]) {
            userSockets[username] = new Set();
        }
        userSockets[username].add(ws);
        
        ws.on('message', (message) => {
            console.log(`Received message from ${username}: ${message}`);
            userSockets[username]?.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            userSockets[username].delete(ws);
            if (userSockets[username].size === 0) {
                delete userSockets[username];
            }
        });
    });

    return wss;
};

export default setupWebSocket;