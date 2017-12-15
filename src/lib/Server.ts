import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import formatResponse from '../middlewares/format-response';
import errorHandler from '../middlewares/errors/errorHandler';
import logError from '../middlewares/errors/logError';
import mongooseErrorHandler from '../middlewares/errors/mongooseErrorHandler';

class Server {
    private server: express.Application;
    private router: express.Router; 
    private port: any;

    /**
     * @param router 
     */
    constructor(router: express.Router) {
        this.router = router;
        this.port = process.env.PORT || 3000;

        this.server = express();

        this.configure();
    }

    /**
     * For now only sets routes
     * 
     * @todo set up winston, helmet, body parse etc.
     */
    public configure(): void {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({
            extended: true
        }));
        
        this.server.use(morgan('dev'));

        this.server.use('/v1', this.router);
        this.server.use(formatResponse);
        this.server.use(logError);
        this.server.use(mongooseErrorHandler);
        this.server.use(errorHandler);
    }

    /**
     * Starts application on given port
     * 
     * @todo make port come from env
     */
    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}

export default Server;