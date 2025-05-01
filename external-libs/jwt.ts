// utils/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // ideally use dotenv

export function generateToken(payload: object, expiresIn = '1h') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}
