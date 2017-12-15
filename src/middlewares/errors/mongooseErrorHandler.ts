import { CastError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from '../../lib/errors';

/**
 * 
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
export default function MongooseErrorHandler(err: Error, req: Request, res: Response, next: Function) {
    let response: any = {
        success: false
    };

    console.log(err);

    if (err instanceof CastError || err instanceof NotFoundError) {
        response['statusCode'] = 404;
        response['message'] = 'Object not found';

        return res.json(response);
    }

    /**
     * @todo format error messages
     */
    if (err.name === 'ValidationError') {
        response['statusCode'] = 422;
        response['message'] = err.toString();

        return res.json(response);
    }

    next(err);
}