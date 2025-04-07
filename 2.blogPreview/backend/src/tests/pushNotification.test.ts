jest.mock('../utils/authTokenHandler.ts', () => ({
    extractUsernameFromAccessToken: jest.fn(),
}));

import http from 'http';
import WebSocket from 'ws';
import setupWebSocket from '../websocket.js';
import dotenv from 'dotenv';
import { Server } from 'http';
import { extractUsernameFromAccessToken } from '../utils/authTokenHandler.js';
import { errorMessages } from '../consts/errorMessages.js';

dotenv.config();
const PORT = process.env.WS_PORT || 5001;

let server: Server;
let wss: ReturnType<typeof setupWebSocket>;

beforeAll((done) => {
    server = http.createServer();
    wss = setupWebSocket(server);
    server.listen(PORT, done);
});

afterAll((done) => {
    wss.close();
    server.close(done);
});

beforeEach(() => {
    jest.resetAllMocks();
});

describe('WebSocket Server tests', () => {
    it('should allow a client with a valid token to connect and echo messages back', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('test_user');
        await new Promise<void>((resolve) => {
            const client = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=some_valid_token` }
            });
            client.on('open', () => {
                client.send(JSON.stringify({ theme: 'GREEN' }));
            });
            client.on('message', (message) => {
                const data = JSON.parse(message.toString());
                expect(data).toEqual({ theme: 'GREEN' });
                client.close();
                resolve();
            });
        });
    });

    it('should propagate messages to other clients with the same username', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('test_user');
        await new Promise<void>((resolve) => {
            const client1 = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=some_valid_token` }
            });
            const client2 = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=some_other_valid_token` }
            });
            const receivedMessages: any[] = [];
            client2.on('message', (message) => {
                const data = JSON.parse(message.toString());
                receivedMessages.push(data);
                if (receivedMessages.length === 1) {
                    expect(receivedMessages).toEqual([{ theme: 'RED' }]);
                    client1.close();
                    client2.close();
                    resolve();
                }
            });
            client1.on('open', () => {
                client1.send(JSON.stringify({ theme: 'RED' }));
            });
        });
    });

    it('should not propagate messages between clients with different usernames', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValueOnce('test_user1').mockReturnValueOnce('test_user2');
        await new Promise<void>((resolve) => {
            let messageReceived = false;
            const client1 = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=some_valid_token` }
            });
            const client2 = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=some_other_valid_token` }
            });
            client2.on('message', () => {
                messageReceived = true;
            });
            client1.on('open', () => {
                client1.send(JSON.stringify({ theme: 'BLUE' }));
            });
            setTimeout(() => {
                expect(messageReceived).toBe(false);
                client1.close();
                client2.close();
                resolve();
            }, 2000);
        });
    });

    it('should reject connection if token is invalid', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.invalidToken);
        });
        await new Promise<void>((resolve) => {
            const client = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=invalid_access_token` }
            });
            client.on('close', (code, reason) => {
                expect(code).toBe(4003);
                expect(reason.toString()).toBe(errorMessages.websocketInvalidToken);
                resolve();
            });
        });
    });

    it('should close the connection via heartbeat if the token expires during session', async () => {
        (extractUsernameFromAccessToken as jest.Mock)
            .mockReturnValueOnce('test_user')
            .mockImplementation(() => {
                throw new Error(errorMessages.invalidToken);
            });
        jest.useFakeTimers();
        await new Promise<void>((resolve) => {
            const client = new WebSocket(`ws://localhost:${PORT}`, {
                headers: { cookie: `access-token=some_token` },
            });
            client.on('open', () => {
                jest.advanceTimersByTime(10 * 60 * 1000);
            });
            client.on('close', (code, reason) => {
                expect(code).toBe(4003);
                expect(reason.toString()).toBe(errorMessages.websocketInvalidToken);
                client.close();
                jest.useRealTimers();
                resolve();
            });
        });
    });
});
