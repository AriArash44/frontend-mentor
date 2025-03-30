import express from 'express';
import db from '../db.js';
import { RowDataPacket } from 'mysql2';
import tokenChecker from '../utils/tokenChecker.js';
import generateToken from '../utils/tokenGeneretor.js';

const router = express.Router();

router.get('/:username', (req, res) => {
    try {
        const { username } = req.params;
        const accessToken = req.cookies['access-token'];
        if (!accessToken) {
            throw new Error('Access token not provided');
        }
        const tokenUsername = tokenChecker(accessToken, 'ACCESS_SECRET_KEY').username;
        if (!tokenUsername) {
            throw new Error('Username not found in token');
        }
        if (tokenUsername !== username) {
            throw new Error('Invalid or expired token');
        }
        db.query<RowDataPacket[]>(
            'SELECT color FROM preferences WHERE username = ?',
            [username],
            (err, results) => {
                if (err) {
                    console.error(err);
                    throw new Error('Error from DB server');
                }
                else if (results.length === 0) {
                    res.status(404).json({ error: 'User not found' });
                }
                else {
                    res.status(200).json({ theme: results[0].color });
                }
            }
        );
    } catch (err: unknown) {
        if (err instanceof Error && err.message === 'Access token not provided') {
            try{
                const { username } = req.params;
                const refreshToken = req.cookies['refresh-token'];
                if (!refreshToken) {
                    throw new Error('Invalid or expired token');
                }
                const tokenUsername = tokenChecker(refreshToken, 'REFRESH_SECRET_KEY').username;
                if (!tokenUsername) {
                    throw new Error('Username not found in token');
                }
                if (tokenUsername !== username) {
                    throw new Error('Invalid or expired token');
                }
                const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
                const accessToken = generateToken({ username: username }, SECRET_KEY, { expiresIn: '1h' });
                db.query<RowDataPacket[]>(
                    'SELECT color FROM preferences WHERE username = ?',
                    [username],
                    (err, results) => {
                        if (err) {
                            console.error(err);
                            throw new Error('Error from DB server');
                        }
                        else if (results.length === 0) {
                            res.status(404).json({ error: 'User not found' }).cookie('access-token', accessToken, {
                                maxAge: 60 * 60 * 1000,
                                sameSite: 'none',
                                secure: true,
                                httpOnly: true
                            });
                        }
                        else {
                            res.status(200).json({ theme: results[0].color }).cookie('access-token', accessToken, {
                                maxAge: 60 * 60 * 1000,
                                sameSite: 'none',
                                secure: true,
                                httpOnly: true
                            });
                        }
                    }
                );
            } catch (err: unknown) {
                if (err instanceof Error && (err.message === 'Username not found in token' || err.message === 'Invalid or expired token')) {
                    res.status(401).json({ message: err.message });
                }
                else {
                    const message = err instanceof Error ? err.message : 'An unknown error occurred';
                    res.status(500).json({ message });
                }
            }
        }
        else if (err instanceof Error && (err.message === 'Username not found in token' || err.message === 'Invalid or expired token')) {
            res.status(401).json({ message: err.message });
        }
        else {
            const message = err instanceof Error ? err.message : 'An unknown error occurred';
            res.status(500).json({ message });
        }
    }
});

router.post('/:username', (req, res) => {
    try {
        const { username } = req.params;
        const { theme } = req.body;
        const accessToken = req.cookies['access-token'];
        if (!accessToken) {
            throw new Error('Access token not provided');
        }
        const tokenUsername = tokenChecker(accessToken, 'ACCESS_SECRET_KEY').username;
        if (!tokenUsername) {
            throw new Error('Username not found in token');
        }
        if (tokenUsername !== username) {
            throw new Error('Invalid or expired token');
        }
        db.query<RowDataPacket[]>(
            'REPLACE INTO preferences (username, color) VALUES (?, ?)',
            [username, theme],
            (err) => {
                if (err) {
                    if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED' || err.code === 'ER_DATA_TOO_LONG') {
                        res.status(400).json({ error: 'Invalid color value' });
                    } else {
                        res.status(500).json({ error: 'Error from DB server' });
                    }
                }
                else { 
                    res.status(200).json({ theme: theme });
                }
            }
        );
    } catch (err: unknown) {
        if (err instanceof Error && err.message === 'Access token not provided') {
            try{
                const { username } = req.params;
                const { theme } = req.body;
                const refreshToken = req.cookies['refresh-token'];
                if (!refreshToken) {
                    throw new Error('Invalid or expired token');
                }
                const tokenUsername = tokenChecker(refreshToken, 'REFRESH_SECRET_KEY').username;
                if (!tokenUsername) {
                    throw new Error('Username not found in token');
                }
                if (tokenUsername !== username) {
                    throw new Error('Invalid or expired token');
                }
                const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
                const accessToken = generateToken({ username: username }, SECRET_KEY, { expiresIn: '1h' });
                db.query<RowDataPacket[]>(
                    'REPLACE INTO preferences (username, color) VALUES (?, ?)',
                    [username, theme],
                    (err) => {
                        if (err) {
                            if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED' || err.code === 'ER_DATA_TOO_LONG') {
                                res.status(400).json({ error: 'Invalid color value' }).cookie('access-token', accessToken, {
                                    maxAge: 60 * 60 * 1000,
                                    sameSite: 'none',
                                    secure: true,
                                    httpOnly: true
                                });
                            } else {
                                res.status(500).json({ error: 'Error from DB server' }).cookie('access-token', accessToken, {
                                    maxAge: 60 * 60 * 1000,
                                    sameSite: 'none',
                                    secure: true,
                                    httpOnly: true
                                });
                            }
                        }
                        else { 
                            res.status(200).json({ theme: theme }).cookie('access-token', accessToken, {
                                maxAge: 60 * 60 * 1000,
                                sameSite: 'none',
                                secure: true,
                                httpOnly: true
                            });
                        }
                    }
                );
            } catch (err: unknown) {
                if (err instanceof Error && (err.message === 'Username not found in token' || err.message === 'Invalid or expired token')) {
                    res.status(401).json({ message: err.message });
                }
                else {
                    const message = err instanceof Error ? err.message : 'An unknown error occurred';
                    res.status(500).json({ message });
                }
            }
        }
        else if (err instanceof Error && (err.message === 'Username not found in token' || err.message === 'Invalid or expired token')) {
            res.status(401).json({ message: err.message });
        }
        else {
            const message = err instanceof Error ? err.message : 'An unknown error occurred';
            res.status(500).json({ message });
        }
    }
});

export default router;