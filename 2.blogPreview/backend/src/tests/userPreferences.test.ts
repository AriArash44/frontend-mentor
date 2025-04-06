jest.mock('../utils/authTokenHandler.js', () => ({
    extractUsernameFromAccessToken: jest.fn(),
    handleRefreshToken: jest.fn(),
}));

jest.mock('../utils/dbQueryHandler.js', () => ({
    getUserPreferences: jest.fn(),
    setUserPreferences: jest.fn(),
}));

import request from 'supertest';
import express from 'express';
import router from '../routes/userPreferences.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import { errorMessages } from '../consts/errorMessages.js';
import {
    extractUsernameFromAccessToken,
    handleRefreshToken,
} from '../utils/authTokenHandler.js';
import {
    getUserPreferences,
    setUserPreferences,
} from '../utils/dbQueryHandler.js';

const app = express();
const PORT = parseInt(process.env.PORT || '443') + 1;
app.use(express.json());
app.use('/api/userPreferences', router);
app.use(cors());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const server = https.createServer(
    {
        key: fs.readFileSync('../localhost-key.pem'),
        cert: fs.readFileSync('../localhost-cert.pem'),
    },
    app
);

let serverInstance: any;
let baseUrl: string;

beforeAll(async () => {
    await new Promise((resolve) => {
        serverInstance = server.listen(PORT, () => {
            baseUrl = `https://localhost:${PORT}`;
            console.log(`HTTPS server running on ${baseUrl}`);
            resolve(true);
        });
    });
});

afterAll(async () => {
    await serverInstance.close();
});

beforeEach(() => {
    jest.resetAllMocks();
});

describe('GET /api/userPreferences/:username Tests', () => {
    it('successfully returns theme when token and username match and preference exists', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        (getUserPreferences as jest.Mock).mockResolvedValue('RED');
        const response = await request(app)
            .get('/api/userPreferences/testUser')
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ theme: 'RED' });
    });

    it('returns 404 with error when user preference is not found', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        (getUserPreferences as jest.Mock).mockResolvedValue(null);
        const response = await request(app)
            .get('/api/userPreferences/testUser')
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: errorMessages.userMissed });
    });

    it('returns 401 when username from token does not match request parameter', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('anotherUser');
        (getUserPreferences as jest.Mock).mockResolvedValue('RED');
        const response = await request(app)
            .get('/api/userPreferences/testUser')
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: errorMessages.invalidToken });
    });

    it('handles missing access token by refreshing token and returns theme successfully', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockReturnValue({
            username: 'testUser',
            accessToken: 'new_valid_token',
        });
        (getUserPreferences as jest.Mock).mockResolvedValue('BLUE');
        const response = await request(app).get(
            '/api/userPreferences/testUser'
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ theme: 'BLUE' });
        expect(response.headers['set-cookie'].toString().includes('access-token=new_valid_token')).toBeTruthy();
    });

    it('handles missing access token and returns 404 when preference is not found', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockReturnValue({
            username: 'testUser',
            accessToken: 'new_valid_token',
        });
        (getUserPreferences as jest.Mock).mockResolvedValue(null);
        const response = await request(app).get(
            '/api/userPreferences/testUser'
        );
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: errorMessages.userMissed });
        expect(response.headers['set-cookie'].toString().includes('access-token=new_valid_token')).toBeTruthy();
    });

    it('returns 500 when an unexpected error occurs (e.g. DB error)', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        (getUserPreferences as jest.Mock).mockRejectedValue(
            new Error('DB error')
        );
        const response = await request(app)
            .get('/api/userPreferences/testUser')
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'DB error' });
    });

    it('returns 401 when extractUsernameFromAccessToken throws usernameNotInToken error', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.usernameNotInToken);
        });
        const response = await request(app)
            .get('/api/userPreferences/testUser')
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: errorMessages.usernameNotInToken,
        });
    });
});

describe('POST /api/userPreferences/:username Tests', () => {
    it('successfully sets user preference when token and username match', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        (setUserPreferences as jest.Mock).mockResolvedValue(true);
        const response = await request(app)
            .post('/api/userPreferences/testUser')
            .send({ theme: 'BLUE' })
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ theme: 'BLUE' });
    });

    it('returns 401 when token and username do not match in POST request', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('anotherUser');
        (setUserPreferences as jest.Mock).mockResolvedValue(true);
        const response = await request(app)
            .post('/api/userPreferences/testUser')
            .send({ theme: 'BLUE' })
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: errorMessages.invalidToken });
    });

    it('handles missing access token in POST by refreshing and setting preference', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockReturnValue({
            username: 'testUser',
            accessToken: 'new_valid_token',
        });
        (setUserPreferences as jest.Mock).mockResolvedValue(true);
        const response = await request(app)
            .post('/api/userPreferences/testUser')
            .send({ theme: 'GREEN' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ theme: 'GREEN' });
        expect(response.headers['set-cookie'].toString().includes('access-token=new_valid_token')).toBeTruthy();
    });

    it('returns 500 when setUserPreferences throws a DB error in POST', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        (setUserPreferences as jest.Mock).mockRejectedValue(
            new Error('DB error')
        );
        const response = await request(app)
            .post('/api/userPreferences/testUser')
            .send({ theme: 'BLUE' })
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'DB error' });
    });

    it('returns 500 when theme is undefined and setUserPreferences fails', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        (setUserPreferences as jest.Mock).mockRejectedValue(
            new Error('Theme is required')
        );
        const response = await request(app)
            .post('/api/userPreferences/testUser')
            .send({})
            .set('Cookie', ['access-token=some_valid_token']);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Theme is required' });
    });

    it('handles error in refresh branch if setUserPreferences fails after token refresh', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockReturnValue({
            username: 'testUser',
            accessToken: 'new_valid_token',
        });
        (setUserPreferences as jest.Mock).mockRejectedValue(
            new Error('Refresh DB error')
        );
        const response = await request(app)
            .post('/api/userPreferences/testUser')
            .send({ theme: 'YELLOW' });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Refresh DB error' });
    });
});
