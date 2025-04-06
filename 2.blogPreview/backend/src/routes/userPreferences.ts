import express from 'express';
import { errorMessages } from '../consts/errorMessages.js';
import { extractUsernameFromAccessToken, handleRefreshToken } from '../utils/authTokenHandler.js';
import { accessCookieOptions } from '../consts/cookieOptions.js';
import { getUserPreferences, setUserPreferences } from '../utils/dbQueryHandler.js';

const router = express.Router();
const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY!;

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        try {
            const tokenUsername = extractUsernameFromAccessToken(req, SECRET_KEY);
            if (tokenUsername !== username) throw new Error(errorMessages.invalidToken);
            const color = await getUserPreferences(username);
            const status = !color ? 404 : 200;
            const response = !color ? { error: errorMessages.userMissed } : { theme: color };
            res.status(status).json(response);
        } catch (err) {
            if (err instanceof Error && err.message === errorMessages.accessTokenMissed) {
                const { username, accessToken } = handleRefreshToken(req, SECRET_KEY, REFRESH_SECRET_KEY);
                const color = await getUserPreferences(username);
                const status = !color ? 404 : 200;
                const response = !color ? { error: errorMessages.userMissed } : { theme: color };
                res.status(status).cookie('access-token', accessToken, accessCookieOptions)
                    .json(response);
            } else {
                throw err;
            }
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : errorMessages.unknownError;
        res.status(err instanceof Error && (err.message === errorMessages.invalidToken || err.message === errorMessages.usernameNotInToken) ? 401 : 500).json({ message });
    }
});

router.post('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { theme } = req.body;
        try {
            const tokenUsername = extractUsernameFromAccessToken(req, SECRET_KEY);
            if (tokenUsername !== username) throw new Error(errorMessages.invalidToken);
            await setUserPreferences(username, theme);
            res.status(200).json({ theme });
        } catch (err) {
            if (err instanceof Error && err.message === errorMessages.accessTokenMissed) {
                const { username: refreshedUsername, accessToken } = handleRefreshToken(req, SECRET_KEY, REFRESH_SECRET_KEY);
                await setUserPreferences(refreshedUsername, theme);
                res.status(200).cookie('access-token', accessToken, accessCookieOptions)
                    .json({ theme });
            } else {
                throw err;
            }
        }
    } catch (err) {
        const status = (err instanceof Error && err.message === errorMessages.invalidToken) ? 401 : 500;
        const message = err instanceof Error ? err.message : errorMessages.unknownError;
        res.status(status).json({ message });
    }
});

export default router;