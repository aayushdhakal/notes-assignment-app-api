import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE , DEVELOPMENT , TEST , PRODUCTION } from '../constants';
import { databaseConfig } from './db.config';
import { User } from './models/users.model';
import { Note } from './models/notes.model';

export const databaseProviders = [{
    // when other parts of your NestJS application request a dependency using the SEQUELIZE token (e.g., through constructor injection), they will receive the Sequelize instance configured according to the environment variables and database configuration specified in this factory function.
    provide:SEQUELIZE,
    // The useFactory property is used to define a factory function that returns the dependency (Sequelize instance in this case). This factory function allows for asynchronous setup, such as connecting to the database using different configurations based on the environment (development, test, production).
    useFactory:async()=>{

        let config;
        switch(process.env.NODE_ENV){
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development
        }

        const sequelize = new Sequelize(config)

        //adding all the models for the User and Note
        sequelize.addModels([User,Note]);
        //await sequelize.sync({alter:true}); //create a table if present and alter table if any changes
        await sequelize.sync({force:true}); //this delete all existing tables along with data and create all the tables
        return sequelize;
    }
}]