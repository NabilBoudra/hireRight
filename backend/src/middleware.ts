import jwt from 'jsonwebtoken';
import { getKey } from './helpers';
import { NextFunction, Request, Response } from 'express';
import { insertUser } from './services';

export function decodeTokenIfExists(req: Request, res: Response, next: NextFunction) { 
    const regex = /^Bearer (.*)$/, authorizationHeader = req.headers['authorization'];
    if(!authorizationHeader) { 
        next();
        return; 
    }
    const isValidHeader = regex.test(authorizationHeader);
    if(!isValidHeader) { 
        next();
        return; 
    }
    const token = authorizationHeader.slice(7, authorizationHeader.length);
    jwt.verify(token, getKey, (err, decoded) => { 
        if(err || !decoded || typeof decoded == "string"
            || !(decoded.oid && decoded.name && decoded.preferred_username && decoded.iat) 
        ) { 
            next();
            return;
        }
        req.user = {id: decoded.oid, name: decoded.name, email: decoded.preferred_username, lastLogin: new Date(decoded.iat * 1000), lastSeen: new Date()};
        insertUser(req.user)
        next();
    });
};

export function checkDecodedToken(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        res.status(401).end();
        return;  
    }
    next();
}