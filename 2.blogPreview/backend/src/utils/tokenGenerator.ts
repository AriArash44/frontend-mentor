import jwt from 'jsonwebtoken';

function generateToken(payload: object, key: string, expiresIn: object): string {
    return jwt.sign(payload, key, expiresIn);
}

export default generateToken;