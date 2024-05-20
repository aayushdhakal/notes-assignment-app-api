import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';

@Module({
    //The providers: [] array within the @Module() decorator in db.module.ts is used to declare providers that are specific to the database module. These providers typically include services, repositories, or other components that interact directly with the database.
    providers:[
        ...databaseProviders,
    ],
    exports:[
        ...databaseProviders
    ]
})
export class DbModule {}
