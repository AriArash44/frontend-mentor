import db from '../db.js';
import { RowDataPacket } from 'mysql2';
import { errorMessages } from '../consts/errorMessages.js';

export const getUserPreferences = (username: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        db.query<RowDataPacket[]>(
            'SELECT color FROM preferences WHERE username = ?',
            [username],
            (err, results) => {
            if (err) {
                return reject(new Error(errorMessages.dbError));
            } else if (results.length === 0) {
                resolve(null);
            } else {
                resolve(results[0].color);
            }
        });
    });
};

export const setUserPreferences = (username: string, theme: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.query(
            'REPLACE INTO preferences (username, color) VALUES (?, ?)',
            [username, theme],
            (err) => {
            if (err) {
                if (err.code === errorMessages.dbConstraintErr || err.code === errorMessages.dbDataTooBig) {
                    return reject(Object.assign(new Error(errorMessages.invalidColor), { status: 400 }));
                } else {
                    return reject(Object.assign(new Error(errorMessages.dbError), { status: 500 }));
                }
            }
            resolve();
        });
    });
};