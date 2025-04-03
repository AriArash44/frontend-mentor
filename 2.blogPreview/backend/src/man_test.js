import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();

function envValidator() {
    if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
        throw new Error('Missing ACCESS_SECRET_KEY or REFRESH_SECRET_KEY in environment variables');
    }
}

function tokenChecker(token, tokenType) {
    try {
        envValidator();
        const SECRET_KEY = process.env[tokenType];
        const verifiedToken = jwt.verify(token, SECRET_KEY);
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

try{
tokenChecker('Invalid_access_token', process.env.ACCESS_SECRET_KEY);
} catch(err){
    console.log(err.message)
}