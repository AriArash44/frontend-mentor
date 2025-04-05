import jwt from 'jsonwebtoken'; 
import { envValidator } from './authTokenHandler.js';
import { errorMessages } from '../consts/errorMessages.js';

export function tokenChecker(token: string, tokenType: string) {
    try {
        const envValidated = envValidator();
        if (!envValidated) {
            throw new Error(errorMessages.envMissed)
        }
        const SECRET_KEY = process.env[tokenType]!;
        const verifiedToken = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        if (!verifiedToken){
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
    try {
        return jwt.sign(payload, key, expiresIn);
    } catch(err) {
        throw new Error(errorMessages.unknownError);
    }
}