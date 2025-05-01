import { NextFunction, Request, Response } from "express";

// function authenticate(req : Request, res : Response, next : NextFunction) {
//     if (!req.session || !req.session.user) {
//         const err = new Error('You shall not pass');
//         err.message = '401';
//         next(err);
//     }
//     next();
// }

// module.exports = authenticate;


// middlewares/authMiddleware.ts
import { verifyToken } from "./jwt";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        // const decoded = jwt.verify(token, JWT_SECRET);
        const decoded = verifyToken(token);
        // Attach user info to request if needed
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateJWT;



// I am going to use this when I am doing my routes