import express from 'express';
import dotenv from 'dotenv';
import { generateToken } from '../utils/jwtTokenHandler.js';
import { errorMessages } from '../consts/errorMessages.js';
import { envValidator, extractUsernameFromAccessToken, handleRefreshToken } from '../utils/authTokenHandler.js';
import { accessCookieOptions, refreshCookieOptions, clearCookieOptions} from '../consts/cookieOptions.js';

dotenv.config();
const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY!;

const router = express.Router();

router.get('/login/:username', (req, res) => {
    try {
        const envValidated = envValidator();
        if (!envValidated) {
            throw new Error(errorMessages.envMissed)
        }
        const { username } = req.params;
        const accessToken = generateToken({ username }, SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = generateToken({ username }, REFRESH_SECRET_KEY, { expiresIn: '1d' });
        res.status(200).cookie('access-token', accessToken, accessCookieOptions)
            .cookie('refresh-token', refreshToken, refreshCookieOptions)
            .json("ok");
    } catch (err) {
        const message = err instanceof Error ? err.message : errorMessages.unknownError;
        res.status(500).json({ message });
    }
});

router.get('/username', (req, res) => {
    try {
        try {
            const username = extractUsernameFromAccessToken(req, SECRET_KEY);
            res.status(200).json({ username });
        } catch (err) {
            if (err instanceof Error && err.message === errorMessages.accessTokenMissed) {
                const { username, accessToken } = handleRefreshToken(req, SECRET_KEY, REFRESH_SECRET_KEY);
                res.status(200).cookie('access-token', accessToken, accessCookieOptions)
                    .json({ username });
            } else {
                throw err;
            }
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : errorMessages.unknownError;
        res.status(err instanceof Error && (err.message === errorMessages.invalidToken || err.message === errorMessages.usernameNotInToken) ? 401 : 500).json({ message });
    }
});

router.get('/logout', (req, res) => {
    res.status(200).cookie('access-token', '', clearCookieOptions)
        .cookie('refresh-token', '', clearCookieOptions)
        .json("ok");
});

export default router;