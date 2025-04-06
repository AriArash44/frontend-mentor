jest.mock('../utils/authTokenHandler.ts', () => ({
    envValidator: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn(),
}));

import { tokenChecker, generateToken } from "../utils/jwtTokenHandler.js";
import { envValidator } from "../utils/authTokenHandler.js";
import { errorMessages } from "../consts/errorMessages.js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

beforeEach(() => {
    jest.resetAllMocks();
});

describe('token checker tests', () => {
    it('should return verified token data when jwt.verify returns valid token', () => {
        const mockToken = 'validToken';
        (envValidator as jest.Mock).mockReturnValue(true);
        (jwt.verify as jest.Mock).mockReturnValue({ username: 'testUser' });
        const result = tokenChecker(mockToken, 'ACCESS_SECRET_KEY');
        expect(result).toEqual({ username: 'testUser' });
        expect(envValidator).toHaveBeenCalled();
        expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'ACCESS_SECRET_KEY');
    });
    
    it('should throw an error with envMissed message if envValidator return false', () => {
        const mockToken = 'anyToken';
        (envValidator as jest.Mock).mockReturnValue(false);
        expect(() => tokenChecker(mockToken, 'ACCESS_SECRET_KEY')).toThrow(errorMessages.envMissed);
        expect(jwt.verify).not.toHaveBeenCalled();
    });
    
    it('should throw an invalidToken error if jwt.verify returns a falsy value', () => {
        const mockToken = 'anyToken';
        (envValidator as jest.Mock).mockReturnValue(true);
        (jwt.verify as jest.Mock).mockReturnValue(undefined);
        expect(() => tokenChecker(mockToken, 'ACCESS_SECRET_KEY')).toThrow(errorMessages.invalidToken);
    });
    
    it('should throw an invalidToken error if jwt.verify throws an error', () => {
        const mockToken = 'anyToken';
        (envValidator as jest.Mock).mockReturnValue(true);
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Some other error');
        });
        expect(() => tokenChecker(mockToken, 'ACCESS_SECRET_KEY')).toThrow(errorMessages.invalidToken);
    });
});

describe('generate token tests', () => {
    it('should return a signed token when called with valid payload, key, and options', () => {
        const payload = { username: 'testUser' };
        const options = { expiresIn: '1h' };
        (jwt.sign as jest.Mock).mockReturnValue('mockSignedToken');
        const result = generateToken(payload, process.env.ACCESS_SECRET_KEY!, options);
        expect(result).toBe('mockSignedToken');
        expect(jwt.sign).toHaveBeenCalledWith(payload, process.env.ACCESS_SECRET_KEY, options);
    });

    it('should throw an error if jwt.sign fails', () => {
        (jwt.sign as jest.Mock).mockImplementation(() => {
            throw new Error('Signing Error');
        });
        expect(() =>
            generateToken({ username: 'testUser' }, 'secretKey', { expiresIn: '1h' })
        ).toThrow(errorMessages.unknownError);
    });
});