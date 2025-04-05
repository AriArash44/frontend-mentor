jest.mock('../utils/jwtTokenHandler.ts', () => ({
    tokenChecker: jest.fn(),
    generateToken: jest.fn(),
}));

import { handleRefreshToken, extractUsernameFromAccessToken, envValidator } from "../utils/authTokenHandler.js";
import { tokenChecker, generateToken } from "../utils/jwtTokenHandler.js";
import { errorMessages } from "../consts/errorMessages.js";
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

const originalAccessKey = process.env.ACCESS_SECRET_KEY;
const originalRefreshKey = process.env.REFRESH_SECRET_KEY;

beforeEach(() => {
    jest.resetAllMocks();
});

describe('refresh token handler tests', () => {
    const mockReq = {
        cookies: {
            'refresh-token': 'validRefreshToken',
        },
    } as unknown as Request;

    it('should throw an error if refresh token is missing', async () => {
        const req = { cookies: {} } as unknown as Request;
        expect(() =>
            handleRefreshToken(req, process.env.ACCESS_SECRET_KEY!, process.env.REFRESH_SECRET_KEY!)
        ).toThrow(errorMessages.invalidToken);
    });

    it('should throw an error if username is not in the token data', () => {
        (tokenChecker as jest.Mock).mockReturnValue({});
        expect(() =>
            handleRefreshToken(mockReq, process.env.ACCESS_SECRET_KEY!, process.env.REFRESH_SECRET_KEY!)
        ).toThrow(errorMessages.usernameNotInToken);
    });

    it('should return the new access token and username if everything is valid', () => {
        const tokenData = { username: 'testUser' };
        const newAccessToken = 'newAccessToken';
        (tokenChecker as jest.Mock).mockReturnValue(tokenData);
        (generateToken as jest.Mock).mockReturnValue(newAccessToken);
        const result = handleRefreshToken(mockReq, process.env.ACCESS_SECRET_KEY!, process.env.REFRESH_SECRET_KEY!);
        expect(result).toEqual({ username: 'testUser', accessToken: 'newAccessToken' });
        expect(tokenChecker).toHaveBeenCalledWith('validRefreshToken', process.env.REFRESH_SECRET_KEY);
        expect(generateToken).toHaveBeenCalledWith(
            { username: 'testUser' },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: '1h' }
        );
    });
});

describe('access token handler tests', () => {
    const mockReq = {
        cookies: {
            'access-token': 'validAccessToken',
        },
    } as unknown as Request;

    it('should throw an error if access token is missing', async () => {
        const req = { cookies: {} } as unknown as Request;
        expect(() =>
            extractUsernameFromAccessToken(req, process.env.ACCESS_SECRET_KEY!)
        ).toThrow(errorMessages.accessTokenMissed);
    });

    it('should throw an error if username is not in the token data', () => {
        (tokenChecker as jest.Mock).mockReturnValue({});
        expect(() =>
            extractUsernameFromAccessToken(mockReq, process.env.ACCESS_SECRET_KEY!)
        ).toThrow(errorMessages.usernameNotInToken);
    });

    it('should return the username if everything is valid', () => {
        const tokenData = { username: 'testUser' };
        (tokenChecker as jest.Mock).mockReturnValue(tokenData);
        const result = extractUsernameFromAccessToken(mockReq, process.env.ACCESS_SECRET_KEY!);
        expect(result).toEqual('testUser');
        expect(tokenChecker).toHaveBeenCalledWith('validAccessToken', process.env.ACCESS_SECRET_KEY);
    });
});

describe('env validator tests', () => {
    afterEach(() => {
        process.env.ACCESS_SECRET_KEY = originalAccessKey;
        process.env.REFRESH_SECRET_KEY = originalRefreshKey;
    });

    it('should return true when both ACCESS_SECRET_KEY and REFRESH_SECRET_KEY are set', () => {
        process.env.ACCESS_SECRET_KEY = 'someKey';
        process.env.REFRESH_SECRET_KEY = 'anotherKey';
        expect(envValidator()).toBe(true);
    });
  
    it('should return false when one SECRET_KEY is missing', () => {
        process.env.ACCESS_SECRET_KEY = '';
        process.env.REFRESH_SECRET_KEY = 'anotherKey';
        expect(envValidator()).toBe(false);
        process.env.ACCESS_SECRET_KEY = 'someKey';
        process.env.REFRESH_SECRET_KEY = '';
        expect(envValidator()).toBe(false);
    });
  
    it('should return false when both ACCESS_SECRET_KEY and REFRESH_SECRET_KEY are missing', () => {
        process.env.ACCESS_SECRET_KEY = '';
        process.env.REFRESH_SECRET_KEY = '';
        expect(envValidator()).toBe(false);
    });
});