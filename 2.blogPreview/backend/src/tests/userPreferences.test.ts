jest.mock('../db.js', () => ({
    query: jest.fn(),
}));

import db from '../db.js';
import request from 'supertest';
import express from 'express';
import router from '../routes/userPreferences.js';
import http from 'http';
import cors from 'cors';
import CustomError from '../types/customError.js';
import setupWebSocket from '../websocket.js';

const app = express();

const server = http.createServer(app);
setupWebSocket(server);

app.use(express.json());
app.use('/api/userPreferences', router);
app.use(cors());

describe('Routes', () => {
    const mockQuery = db.query as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /:username - success', async () => {
        const username = 'testuser';
        const expectedTheme = 'RED';

        mockQuery.mockImplementation((query, values, callback) => {
            callback(null, [{ color: expectedTheme }]);
        });

        const response = await request(app).get(
            `/api/userPreferences/${username}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ theme: expectedTheme });
    });

    test('GET /:username - user not found', async () => {
        const username = 'unknownuser';

        mockQuery.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const response = await request(app).get(
            `/api/userPreferences/${username}`
        );
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'User not found' });
    });

    test('POST /:username - success', async () => {
        const username = 'testuser';
        const theme = 'BLUE';

        mockQuery.mockImplementation((query, values, callback) => {
            callback(null);
        });

        const response = await request(app)
            .post(`/api/userPreferences/${username}`)
            .send({ theme });

        expect(response.status).toBe(200);
        expect(response.headers['set-cookie'][0]).toContain('user_theme=BLUE');
    });

    test('POST /:username - invalid color', async () => {
        const username = 'testuser';
        const theme = 'INVALID_COLOR';

        mockQuery.mockImplementation((query, values, callback) => {
            const error = new Error('Invalid color value') as CustomError;
            error.code = 'ER_DATA_TOO_LONG';
            callback(error);
        });

        const response = await request(app)
            .post(`/api/userPreferences/${username}`)
            .send({ theme });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid color value' });
    });

    test('POST /:username - invalid color', async () => {
        const username = 'testuser';
        const theme = 'WHITE';

        mockQuery.mockImplementation((query, values, callback) => {
            const error = new Error('Invalid color value') as CustomError;
            error.code = 'ER_CHECK_CONSTRAINT_VIOLATED';
            callback(error);
        });

        const response = await request(app)
            .post(`/api/userPreferences/${username}`)
            .send({ theme });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid color value' });
    });

    test('POST /:username - internal server error', async () => {
        const username = 'testuser';
        const theme = 'BLUE';

        mockQuery.mockImplementation((query, values, callback) => {
            const error = new Error('Internal Server Error') as CustomError;
            callback(error);
        });

        const response = await request(app)
            .post(`/api/userPreferences/${username}`)
            .send({ theme });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
