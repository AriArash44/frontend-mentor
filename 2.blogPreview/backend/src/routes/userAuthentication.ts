import express from 'express';
import dotenv from 'dotenv';
import envValidator from '../utils/envValidator.js';
import tokenChecker from '../utils/tokenChecker.js';
import generateToken from '../utils/tokenGenerator.js';
import { errorMessages } from '../consts/errorMessages.js';

dotenv.config();

const router = express.Router();

router.get('/login/:username', (req, res) => {
    try {
        envValidator();
        const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
        const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY!;
        const { username } = req.params;
        const accessToken = generateToken({ username: username }, SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = generateToken({ username: username }, REFRESH_SECRET_KEY, { expiresIn: '1d' });
        res.status(200).cookie('access-token', accessToken, {
            maxAge: 60 * 60 * 1000,
            sameSite: 'none',
            secure: true,
            httpOnly: true
        }).cookie('refresh-token', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true,
            httpOnly: true
        }).json("ok");
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : errorMessages.unknownError;
        res.status(500).json({ message });
    }
});

router.get('/username', (req, res) => {
    try {
        const accessToken = req.cookies['access-token'];
        if (!accessToken) {
            throw new Error(errorMessages.accessTokenMissed);
        }
        const decodedToken = tokenChecker(accessToken, 'ACCESS_SECRET_KEY');
        const username = decodedToken?.username;
        if (!username) {
            throw new Error(errorMessages.usernameNotInToken);
        }
        res.status(200).json({ username: username });
    } catch (err: unknown) {
        if (err instanceof Error && err.message === errorMessages.accessTokenMissed) {
            try{
                const refreshToken = req.cookies['refresh-token'];
                if (!refreshToken) {
                    throw new Error(errorMessages.invalidToken);
                }
                const username = tokenChecker(refreshToken, 'REFRESH_SECRET_KEY').username;
                if (!username) {
                    throw new Error(errorMessages.usernameNotInToken);
                }
                const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
                const accessToken = generateToken({ username: username }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).cookie('access-token', accessToken, {
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                    httpOnly: true
                }).json({ username: username });
            } catch (err: unknown) {
                if (err instanceof Error && (err.message === errorMessages.usernameNotInToken || err.message === errorMessages.invalidToken)) {
                    res.status(401).json({ message: err.message });
                }
                else {
                    const message = err instanceof Error ? err.message : errorMessages.invalidToken;
                    res.status(500).json({ message });
                }
            }
        }
        else if (err instanceof Error && (err.message === errorMessages.usernameNotInToken || err.message === errorMessages.invalidToken)) {
            res.status(401).json({ message: err.message });
        }
        else {
            const message = err instanceof Error ? err.message : errorMessages.unknownError;
            res.status(500).json({ message });
        }
    }
});

router.get('/logout', (req, res) => {
    res.status(200).cookie('access-token', '', {
        maxAge: 0,
        sameSite: 'none',
        secure: true,
        httpOnly: true
    }).cookie('refresh-token', '', {
        maxAge: 0,
        sameSite: 'none',
        secure: true,
        httpOnly: true
    }).json("ok");
});

export default router;