import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import { errorMessages } from '../consts/errorMessages.js';

dotenv.config();

export function envValidator(): void {
    if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
        throw new Error(errorMessages.envMissed);
    }
}

export function tokenChecker(token: string, tokenType: string) {
    try {
        envValidator();
        const SECRET_KEY = process.env[tokenType]!;
        const verifiedToken = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        if(!verifiedToken){
            throw new Error();
        }
        return verifiedToken;
    } catch (err) {
        if (err instanceof Error && err.message === errorMessages.envMissed) {
            throw new Error(err.message);
        }
        else {
            throw new Error(errorMessages.invalidToken);
        }
    }
}

export function generateToken(payload: object, key: string, expiresIn: object): string {
    return jwt.sign(payload, key, expiresIn);
}