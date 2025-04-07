import { extractUsernameFromAccessToken } from './utils/authTokenHandler.js';
import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import UserSocket from './types/userSocket.js';
import { Request } from 'express';
import dotenv from 'dotenv';
import { errorMessages } from './consts/errorMessages.js';

dotenv.config();
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY!;

function parseCookies(cookieHeader?: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    if (!cookieHeader) {
        return cookies;
    }
    cookieHeader.split(';').forEach(cookieStr => {
        const [key, ...v] = cookieStr.split('=');
        if (!key) return;
        const value = v.join('=');
        cookies[key.trim()] = value.trim();
    });
    return cookies;
}

const setupWebSocket = (server: Server) => {
    const wss = new WebSocketServer({ server });
    const userSockets: UserSocket = {};
    wss.on('connection', (ws: WebSocket, req) => {
        const cookies = parseCookies(req.headers?.cookie);
        let username: string;
        try {
            username = extractUsernameFromAccessToken({ cookies } as Request, ACCESS_SECRET_KEY);
        } catch (err: any) {
            ws.send(JSON.stringify({ message: errorMessages.websocketInvalidToken }));
            ws.close(4003, errorMessages.websocketInvalidToken);
            return;
        }

        if (!userSockets[username]) {
            userSockets[username] = new Set();
        }
        userSockets[username].add(ws);

        const heartbeat = setInterval(() => {
            try {
                const currentCookies = parseCookies(req.headers?.cookie);
                extractUsernameFromAccessToken({ cookies: currentCookies } as Request, ACCESS_SECRET_KEY);
            } catch (err) {
                ws.send(JSON.stringify({ message: errorMessages.websocketInvalidToken }));
                ws.close(4003, errorMessages.websocketInvalidToken);
                clearInterval(heartbeat);
            }
        }, 10 * 60 * 1000);

        ws.on('message', (message) => {
            userSockets[username]?.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            clearInterval(heartbeat);
            userSockets[username].delete(ws);
            if (userSockets[username].size === 0) {
                delete userSockets[username];
            }
        });
    });

    return wss;
};

export default setupWebSocket;
