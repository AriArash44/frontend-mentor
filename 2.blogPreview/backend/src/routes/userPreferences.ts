import express from 'express';
import db from '../db.js';
import { RowDataPacket } from 'mysql2';
import UserPreference from '../types/userPreference.js';
import tokenChecker from '../utils/tokenChecker.js';

const router = express.Router();

router.get('/:username', (req, res) => {
    const { username } = req.params;
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        if (tokenChecker(token, 'ACCESS_SECRET_KEY')?.username !== username) {
            throw new Error('Invalid or expired token');
        }
        db.query<RowDataPacket[]>(
        'SELECT color FROM preferences WHERE username = ?',
        [username],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userPreference: UserPreference = { theme: results[0].color };
            res.cookie('user_theme', results[0].color, {
                maxAge: 60 * 1000,
                sameSite: 'none',
                secure: true,
            });
            return res.json(userPreference);
        }
        );
    } catch(err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message });
    }
});

router.post('/:username', (req, res) => {
    const { username } = req.params;
    const { theme } = req.body;

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }
    
    const token = authHeader.split(' ')[1];
    try {
        if (tokenChecker(token, 'ACCESS_SECRET_KEY')?.username !== username) {
            throw new Error('Invalid or expired token');
        }
        db.query(
            'REPLACE INTO preferences (username, color) VALUES (?, ?)',
            [username, theme],
            (err) => {
                if (err) {
                    if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED' || err.code === 'ER_DATA_TOO_LONG') {
                        return res
                            .status(400)
                            .json({ error: 'Invalid color value' });
                    } else {
                        return res
                            .status(500)
                            .json({ error: 'Internal Server Error' });
                    }
                }
                res.cookie('user_theme', theme, {
                    maxAge: 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
                return res.sendStatus(200);
            }
        );
    } catch(err: unknown) {
        console.log(err);
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message });
    }
});

export default router;