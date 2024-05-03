import { IDatabaseConfig } from "./interfaces/dbConfig.interface";
import * as dotenv  from 'dotenv';

dotenv.config();
const processValue = process.env;

const defaultValue = {
    username:processValue.DB_USERNAME,
    password:processValue.DB_PASSWORD,
    host:processValue.DB_HOST,
    port:processValue.DB_PORT,
    dialect:processValue.DB_DIALECT,
}

export const databaseConfig:IDatabaseConfig = {
    test:{
        ...defaultValue,
        database:processValue.DB_NAME_TEST
    },
    development:{
        ...defaultValue,
        database:processValue.DB_NAME_DEVELOPMENT
    },
    production:{
        ...defaultValue,
        database:processValue.DB_NAME_PRODUCTION
    }
}