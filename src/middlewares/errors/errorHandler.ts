import { Request, Response, NextFunction} from 'express';

/**
 * Sends 500 response
 * 
 * @param err 
 * @param req 
 * @param res 
 */
export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500);

    res.json({ 'message': err.message });
}