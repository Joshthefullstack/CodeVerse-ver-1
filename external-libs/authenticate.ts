import { NextFunction, Request, Response } from "express";

function authenticate(req : Request, res : Response, next : NextFunction) {
    if (!req.session || !req.session.user) {
        const err = new Error('You shall not pass');
        err.message = '401';
        next(err);
    }
    next();
}

module.exports = authenticate;

// I am going to use this when I am doing my routes