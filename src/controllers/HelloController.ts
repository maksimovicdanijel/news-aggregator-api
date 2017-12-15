import { Request, Response, NextFunction } from 'express';

class HelloController {
    /**
     * Example method
     * 
     * @param req 
     * @param res 
     * @param next
     */
    public async indexAction(req: Request, res: Response, next: NextFunction) {
        res.json({'message': 'Hello'});
    }
}

export default new HelloController();