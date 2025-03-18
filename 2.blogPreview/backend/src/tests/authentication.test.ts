import express from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import router from '../routes/userAuthentication.js';

dotenv.config();
process.env.ACCESS_SECRET_KEY = 'test_access';
process.env.REFRESH_SECRET_KEY = 'test_refresh';

jest.mock('../utils/envValidator.js', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../utils/tokenChecker.js', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../utils/generateToken.js', () => ({
    __esModule: true,
    default: jest.fn(),
}));

import envValidator from '../utils/envValidator.js';
import tokenChecker from '../utils/tokenChecker.js';
import generateToken from '../utils/generateToken.js';

const app = express();
app.use(express.json());
app.use('/api/authentication', router);

describe('Authentication routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    describe('GET /login/:username', () => {
        test('should return access and refresh tokens on success', async () => {
            (envValidator as jest.Mock).mockImplementation(() => {});
            (generateToken as jest.Mock)
                .mockImplementationOnce(() => 'access123')
                .mockImplementationOnce(() => 'refresh123');
            const response = await request(app).get('/api/authentication/login/john');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                accessToken: 'access123',
                refreshToken: 'refresh123',
            });
        });

        test('should return 500 if envValidator throws an error', async () => {
            (envValidator as jest.Mock).mockImplementation(() => {
                throw new Error('Env Error');
            });
            const response = await request(app).get('/api/authentication/login/john');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Env Error' });
        });

        test('should return 401 if no Authorization header is provided', async () => {
            const response = await request(app).get('/api/authentication/username');
            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                message: 'Authorization header missing',
            });
        });

        test('should return 401 if Authorization header is malformed', async () => {
            const response = await request(app)
                .get('/api/authentication/username')
                .set('Authorization', 'InvalidToken');
            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                message: 'Authorization header missing',
            });
        });

        test('should return 200 with the username when token is valid', async () => {
            (tokenChecker as jest.Mock).mockReturnValue({ username: 'john' });
            const response = await request(app)
                .get('/api/authentication/username')
                .set('Authorization', 'Bearer some-valid-token');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'john' });
        });

        test('should return 401 if tokenChecker returns an object with no username', async () => {
            (tokenChecker as jest.Mock).mockReturnValue({ username: '' });
            const response = await request(app)
                .get('/api/authentication/username')
                .set('Authorization', 'Bearer some-valid-token');
            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                message: 'Username not found in token',
            });
        });

        test('should return 401 if tokenChecker throws an error', async () => {
            (tokenChecker as jest.Mock).mockImplementation(() => {
                throw new Error('Invalid Token');
            });
            const response = await request(app)
                .get('/api/authentication/username')
                .set('Authorization', 'Bearer some-valid-token');
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ message: 'Invalid Token' });
        });

        test('should return 401 if no Authorization header is provided', async () => {
            const response = await request(app).post('/api/authentication/refresh-token');
            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                message: 'Authorization header missing',
            });
        });

        test('should return a new access token if tokenChecker succeeds', async () => {
            (tokenChecker as jest.Mock).mockReturnValue({ username: 'john' });
            (generateToken as jest.Mock).mockReturnValue('newAccessToken');
            const response = await request(app)
                .post('/api/authentication/refresh-token')
                .set('Authorization', 'Bearer some-refresh-token');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ accessToken: 'newAccessToken' });
        });

        test('should return 500 if tokenChecker throws an error', async () => {
            (tokenChecker as jest.Mock).mockImplementation(() => {
                throw new Error('Refresh Error');
            });
            const response = await request(app)
                .post('/api/authentication/refresh-token')
                .set('Authorization', 'Bearer some-refresh-token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Refresh Error' });
        });
    });
});