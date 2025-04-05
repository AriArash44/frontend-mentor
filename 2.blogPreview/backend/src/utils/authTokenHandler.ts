import { tokenChecker, generateToken } from './jwtTokenHandler.js';
import { errorMessages } from '../consts/errorMessages.js';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

export function envValidator(): boolean {
    if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
        return false;
    }
    return true;
}

export const handleRefreshToken = (req: Request, secretKey: string, refreshSecretKey: string) => {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) {
        throw new Error(errorMessages.invalidToken);
    }
    const tokenData = tokenChecker(refreshToken, refreshSecretKey);
    if (!tokenData.username) {
        throw new Error(errorMessages.usernameNotInToken);
    }
    const newAccessToken = generateToken({ username: tokenData.username }, secretKey, { expiresIn: '1h' });
    return { username: tokenData.username, accessToken: newAccessToken };
};

export const extractUsernameFromAccessToken = (req: Request, secretKey: string) => {
    const accessToken = req.cookies['access-token'];
    if (!accessToken) {
        throw new Error(errorMessages.accessTokenMissed);
    }
    const tokenData = tokenChecker(accessToken, secretKey);
    if (!tokenData.username) {
        throw new Error(errorMessages.usernameNotInToken);
    }
    return tokenData.username;
};
