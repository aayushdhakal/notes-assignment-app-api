import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './core/db/db.module';
import { ConfigModule} from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { GroupModule } from './modules/group/group.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    //This is the module used for the env variable and isGlobal:true enable the app to use the environment variable globally
    ConfigModule.forRoot({isGlobal:true}),
    DbModule,
    UsersModule,
    AuthModule,
    NotesModule,
    GroupModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
