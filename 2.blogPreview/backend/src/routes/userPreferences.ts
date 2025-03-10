import express from 'express';
import db from '../db.js';

const router = express.Router();

interface UserPreference {
    theme: string;
}
  
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT theme FROM user_preferences WHERE user_id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { theme } = req.body;

  db.query('REPLACE INTO user_preferences (user_id, theme) VALUES (?, ?)', [userId, theme], (err) => {
    if (err) throw err;
    res.cookie('user_theme', theme, { maxAge: 900000, httpOnly: true });
    res.sendStatus(200);
  });
});

export default router;
