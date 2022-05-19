import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'Acc3ssT0k3nS3cr3t', (err, user) => {
        if (err) return res.sendStatus(403);

        (req as any).user = user;
        return next();
    });
};

export default authJwt;