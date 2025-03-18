import envValidator from './envValidator.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();

function tokenChecker(token: string, tokenType: string) {
    envValidator();
    const SECRET_KEY = process.env[tokenType]!;

    try {
        return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

export default tokenChecker;