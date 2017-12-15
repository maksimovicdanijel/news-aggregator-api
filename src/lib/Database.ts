import { MongoClient } from 'mongodb';
import { Db } from 'mongodb';
import * as mongoose from 'mongoose';

class Database {
    private static instance: Database;
    private host: string;
    private port: string;
    private dbName: string;
    private connection: Db;

    /**
     * Parses database parameters from env
     */
    private constructor() {
        this.host = process.env.MONGO_HOST;
        this.port = process.env.MONGO_PORT;
        this.dbName = process.env.DB_NAME;

        (<any>mongoose).Promise = global.Promise;
    }

    /**
     * @returns { Database } 
     */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    /**
     * Concatenates host, port and db name
     * to form connection URI
     * 
     * @returns { string }
     */
    private getConnectionURI(): string {
        return `mongodb://${this.host}:${this.port}/${this.dbName}`;
    }

    /**
     * @returns { Db }
     */
    private getConnection(): Db {
        return this.connection;
    }

    /**
     * @returns { Promise }
     */
    public connect(): Promise<boolean> {
        return new Promise((resolve: Function, reject: Function) => {
            mongoose.connect(this.getConnectionURI(), { useMongoClient: true }, (err) => {
                if (err) {
                    console.log(err);
    
                    return reject(false);
                }

                console.log('Connected to Mongo.');
    
                return resolve(true);
            });
        });
    }
}

export default Database;