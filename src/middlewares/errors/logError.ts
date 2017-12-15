import { Request, Response, NextFunction } from 'express';

/**
 * Logs an error
 * 
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
export default function logError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    next(err);
}