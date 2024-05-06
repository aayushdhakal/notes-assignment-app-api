import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import CustomJWTService from './jwt.service';
import { JwtAuthGuardProvider } from './guards/jwt.guard'
import { LocalStrategy } from './local.strategy';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      global:true,
      secret:process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions:{expiresIn:process.env.TOKEN_EXPIRATION}
    })
  ],
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    CustomJWTService,
    JwtAuthGuardProvider //this is the JWT providers which is used for global guards and is intanciated globally in every route
  ],
  controllers: [AuthController],
})
export class AuthModule {}
