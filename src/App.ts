import routes from './routes';
import Server from './lib/Server';
import Database from './lib/Database';
import Enviroment from './enum/environment';

class App {
    private static instance: App;
    private server: Server;
    private database: Database;
    private environment: string;

    public constructor() {
        this.server = new Server(routes);
        this.database = Database.getInstance();

        this.environment = process.env.NODE_ENV;

        this.handleProcessExceptions();
    }

    /**
     * @returns {App}
     */
    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    /**
     * Restarts process on uncaught exception
     * and uhandled promise rejection
     */
    public handleProcessExceptions(): void {
        process.on('uncaughtException', (err: Error) => {
            console.log('uncaught exception', err);

            process.exit(1);
        })

        process.on('unhandledRejection', (err: Error) => {
            console.log('unhandled rejection', err);

            process.exit(1);
        });
    }

    /**
     * Main entrance method
     */
    public bootstrap(): Promise<any> {
        return this.database.connect()

            .then(() => {
                return true
            })

            .catch((err: Error) => {
                console.log(err.message);

                throw err;
            })
    }

    public start(): void {
        this.server.start();
    }

    public getEnvironment(): string {
        return this.environment;
    }

    public isDevelopmentEnv(): boolean {
        return this.environment === Enviroment.DEVELOPMENT;
    }

    public isProductionEnv(): boolean {
        return this.environment === Enviroment.PRODUCTION;
    }

    public isTestEnv(): boolean {
        return this.environment === Enviroment.TEST;
    }
}

export = App;