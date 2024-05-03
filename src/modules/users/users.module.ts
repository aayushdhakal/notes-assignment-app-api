import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { JwtAuthGuardProvider } from '../auth/guards/jwt.guard';

@Module({
  providers: [
    UsersService,
    ...usersProviders
  ],
  exports:[UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
