import express from 'express';
import db from '../db.js';
import { RowDataPacket } from 'mysql2';

const router = express.Router();

interface UserPreference {
    theme: string;
}

router.get('/:username', (req, res) => {
    const { username } = req.params;
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
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userPreference);
        }
    );
});

router.post('/:username', (req, res) => {
    const { username } = req.params;
    const { theme } = req.body;

    db.query(
        'REPLACE INTO preferences (username, color) VALUES (?, ?)',
        [username, theme],
        (err) => {
            if (err) {
                console.error(err);
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
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.sendStatus(200);
        }
    );
});

export default router;
