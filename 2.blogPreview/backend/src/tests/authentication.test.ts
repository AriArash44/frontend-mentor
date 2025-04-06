jest.mock('../utils/authTokenHandler.ts', () => ({
    ...jest.requireActual('../utils/authTokenHandler.ts'),
    envValidator: jest.fn(),
    extractUsernameFromAccessToken: jest.fn(),
    handleRefreshToken: jest.fn(),
}));

jest.mock('../utils/jwtTokenHandler.js', () => ({
    tokenChecker: jest.fn(),
    generateToken: jest.fn(),
}));

import express from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import router from '../routes/userAuthentication.js';
import https from 'https';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import { envValidator } from '../utils/authTokenHandler.js';
import { generateToken, tokenChecker } from '../utils/jwtTokenHandler.js';
import { extractUsernameFromAccessToken, handleRefreshToken } from '../utils/authTokenHandler.js';
import { errorMessages } from '../consts/errorMessages.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 443;

app.use(express.json());
app.use(cookieParser());
app.use('/api/authentication', router);

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

describe('route login tests', () => {
    it('should return access and refresh token cookies on success', async () => {
        (envValidator as jest.Mock).mockReturnValue(true);
        (generateToken as jest.Mock)
            .mockImplementationOnce(() => 'access123')
            .mockImplementationOnce(() => 'refresh123');
        const response = await request(baseUrl).get(
            '/api/authentication/login/john'
        );
        expect(response.status).toBe(200);
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('access-token=access123'),
                expect.stringContaining('refresh-token=refresh123'),
            ])
        );
    });

    it('should return 500 if envValidator return false', async () => {
        (envValidator as jest.Mock).mockReturnValue(false);
        const response = await request(baseUrl).get(
            '/api/authentication/login/john'
        );
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessages.envMissed });
    });

    it('should return 500 if generateToken throw an Error', async () => {
        (envValidator as jest.Mock).mockReturnValue(true);
        (generateToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.unknownError);
        });
        const response = await request(baseUrl).get(
            '/api/authentication/login/john'
        );
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessages.unknownError });
    });
});

describe('route username tests', () => {
    it('should return 401 if username doesnt exist in access-token cookie', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.usernameNotInToken);
        });
        const response = await request(baseUrl)
            .get('/api/authentication/username')
            .set('Cookie', ['access-token=some_valid_token_without_username']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: errorMessages.usernameNotInToken,
        });
    });

    it('should return 401 if access-token is Invalid', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.invalidToken);
        });
        const response = await request(baseUrl)
            .get('/api/authentication/username')
            .set('Cookie', ['access-token=Invalid_access_token']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: errorMessages.invalidToken
        });
    });

    it('should return 200 with the username when access token is valid', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockReturnValue('testUser');
        const response = await request(baseUrl)
            .get('/api/authentication/username')
            .set('Cookie', ['access-token=some-valid-token']);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ username: 'testUser' });
    });

    it('should return 401 if access token is not provided and refresh token is invalid', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.invalidToken);
        })
        const response = await request(baseUrl)
            .get('/api/authentication/username')
            .set('Cookie', ['refresh-token=Invalid-refresh-token']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: errorMessages.invalidToken,
        });
    });

    it('should return 401 if access token is not provided and username doesnt exist in refresh-token', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.usernameNotInToken);
        })
        const response = await request(baseUrl)
            .get('/api/authentication/username')
            .set('Cookie', ['refresh-token=Invalid-refresh-token']);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: errorMessages.usernameNotInToken,
        });
    });

    it('should return 200 with the username and new access-token when access token id not provided but refresh token is valid', async () => {
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessages.accessTokenMissed);
        });
        (handleRefreshToken as jest.Mock).mockReturnValue({username: 'testUser', accessToken: 'newAccessToken'});
        const response = await request(baseUrl)
            .get('/api/authentication/username')
            .set('Cookie', ['refresh-token=some-valid-token']);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ username: 'testUser' });
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('access-token=newAccessToken'),
            ])
        );
    });

    it('should return 401 if no access token and refresh token was provided', async () => {
        const realExtractUsernameFromAccessToken = jest.requireActual('../utils/authTokenHandler.ts').extractUsernameFromAccessToken;
        const realHandleRefreshToken = jest.requireActual('../utils/authTokenHandler.ts').handleRefreshToken;
        (extractUsernameFromAccessToken as jest.Mock).mockImplementation(realExtractUsernameFromAccessToken);
        (handleRefreshToken as jest.Mock).mockImplementation(realHandleRefreshToken);
        const response = await request(baseUrl).get(
            '/api/authentication/username'
        );
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: errorMessages.invalidToken
        });
    });
});

describe('route logout tests', () => {
    test('should clear cookies and return 200 on logout', async () => {
        const response = await request(baseUrl)
            .get('/api/authentication/logout')
            .set('Cookie', [
                'access-token=anyValue',
                'refresh-token=anyValue',
            ]);
        expect(response.status).toBe(200);
        expect(response.body).toBe('ok');
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('access-token='),
                expect.stringContaining('refresh-token='),
                expect.stringContaining('Max-Age=0'),
            ])
        );
    });
});