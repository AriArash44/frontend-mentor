import http from 'http';
import WebSocket from 'ws';
import setupWebSocket from '../websocket.js';
import dotenv from 'dotenv';
import { Server } from 'http';

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

describe('WebSocket Server tests', () => {
    test('should allow clients to connect and receive messages', (done) => {
        const client = new WebSocket(`ws://localhost:${5001}?username=testuser`);
        client.on('message', (message) => {
            const data = JSON.parse(message.toString());
            expect(data).toEqual({ theme: 'GREEN' });
            client.close();
            done();
        });
        client.on('open', () => {
            client.send(JSON.stringify({ theme: 'GREEN' }));
        });
    });

    test('should propagate messages sent by one client to other clients with the same username', (done) => {
        const client1 = new WebSocket(`ws://localhost:${PORT}?username=testuser`);
        const client2 = new WebSocket(`ws://localhost:${PORT}?username=testuser`);
        const receivedMessages: any[] = [];
        client2.on('message', (message) => {
            const data = JSON.parse(message.toString());
            receivedMessages.push(data);
            if (receivedMessages.length === 1) {
                expect(receivedMessages).toEqual([{ theme: 'RED' }]);
                client1.close();
                client2.close();
                done();
            }
        });
        client1.on('open', () => {
            client1.send(JSON.stringify({ theme: 'RED' }));
        });
    });

    test('should not propagate messages sent by one client to other clients with different usernames', (done) => {
        let messageReceived = false;
        const client1 = new WebSocket(`ws://localhost:${PORT}?username=user1`);
        const client2 = new WebSocket(`ws://localhost:${PORT}?username=user2`);
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
            done();
        }, 2000);
    });
});