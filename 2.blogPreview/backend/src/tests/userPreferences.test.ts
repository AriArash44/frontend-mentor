import request from 'supertest';
import express from 'express';
import router from '../routes/userPreferences.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use('/api/userPreferences', router);
app.use(cors());

describe('Routes', () => {
    const mockQuery = jest.fn();
    jest.mock('../db', () => ({
        query: (query: string, values: any[], callback: Function) =>
            mockQuery(query, values, callback),
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /:username - success', async () => {
        const username = 'testuser';
        const expectedTheme = 'RED';

        mockQuery.mockImplementation((query, values, callback) => {
            callback(null, [{ color: expectedTheme }]);
        });

        const response = await request(app).get(`/api/userPreferences/${username}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ theme: expectedTheme });
    });

    test('GET /:username - user not found', async () => {
        const username = 'unknownuser';

        mockQuery.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const response = await request(app).get(`/api/userPreferences/${username}`);
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

        interface CustomError extends Error {
            code?: string;
        }

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

        interface CustomError extends Error {
            code?: string;
        }

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
            const error = new Error('Internal Server Error');
            callback(error);
        });

        const response = await request(app)
            .post(`/api/userPreferences/${username}`)
            .send({ theme });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
