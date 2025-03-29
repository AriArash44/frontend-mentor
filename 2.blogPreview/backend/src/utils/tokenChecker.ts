import envValidator from './envValidator.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();

function tokenChecker(token: string, tokenType: string) {
    try {
        envValidator();
        const SECRET_KEY = process.env[tokenType]!;
        return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    } catch (err) {
        if (err instanceof Error && err.message === 'Missing ACCESS_SECRET_KEY or REFRESH_SECRET_KEY in environment variables') {
            throw new Error(err.message);
        }
        throw new Error('Invalid or expired token');
    }
}

export default tokenChecker;