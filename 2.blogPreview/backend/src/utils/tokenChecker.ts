import envValidator from './envValidator.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();

function tokenChecker(token: string, tokenType: string) {
    try {
        envValidator();
        const SECRET_KEY = process.env[tokenType]!;
        const verifiedToken = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        console.log(verifiedToken);
        if(!verifiedToken){
            throw new Error('Invalid or expired token');
        }
        return verifiedToken;
    } catch (err) {
        if (err instanceof Error && err.message === 'Missing ACCESS_SECRET_KEY or REFRESH_SECRET_KEY in environment variables') {
            throw new Error(err.message);
        }
        else {
            throw err;
        }
    }
}

export default tokenChecker;