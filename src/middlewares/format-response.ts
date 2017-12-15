import { Request, Response } from 'express';

/**
 * Sets success, status code and data for request
 * 
 * @param req 
 * @param res 
 */
export default function formatResponse(req: Request, res: Response) {
    let success: boolean = res.locals['success'] !== false;
    let statusCode: number = res.locals['statusCode'] ? res.locals['statusCode'] : 200;
    let data: any = res.locals['data'];

    let response: any = {
        success,
        statusCode
    };

    if (typeof data !== 'undefined') {
        response['data'] = data;
    }

    if (!success) {
        response['message'] = res.locals['message'];
    }

    if (!success && res.locals['errors']) {
        response['errors'] = res.locals['errors'];
    }

    res.json(response);
}