import express from 'express';
import dotenv from 'dotenv';
import envValidator from '../utils/envValidator.js';
import tokenChecker from '../utils/tokenChecker.js';
import generateToken from '../utils/generateToken.js';

dotenv.config();

const router = express.Router();

router.get('/login/:username', (req, res) => {
    try {
        envValidator();
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown Error occuered!';
        res.status(500).json({ message });
    }
    
    const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
    const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY!;

    const { username } = req.params;
    const accessToken = generateToken({ username: username }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = generateToken({ username: username }, REFRESH_SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json("ok").cookie('access-token', accessToken, {
        maxAge: 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
        httpOnly: true
    }).cookie('refresh-token', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
        httpOnly: true
    });
});

router.get('/username', (req, res) => {
    const accessToken = req.cookies['access-token']
    if (!accessToken) {
        res.status(401).json({ message: 'Access token not provided' });
        return;
    }

    try {
        const username = tokenChecker(accessToken, 'ACCESS_SECRET_KEY').username;
        if (!username) {
            res.status(401).json({ message: 'Username not found in token' });
            return;
        }
        res.status(200).json({ username: username });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(401).json({ message });
    }
    
});

router.get('/refresh-token', (req, res) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }

    const token = accessToken.split(' ')[1];
    try {
        const username = tokenChecker(token, 'REFRESH_SECRET_KEY').username;
        const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY!;

        const accessToken = generateToken( { username: username }, ACCESS_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ accessToken: accessToken });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message });
    }    
});

export default router;
