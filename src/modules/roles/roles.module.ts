import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ROLES_REPOSITORY } from 'src/core/constants';
import { Roles } from 'src/core/db/models/roles.model';
import { RolesController } from './roles.controller';

@Module({
  providers: [
    RolesService,
    {
      provide:ROLES_REPOSITORY,
      useValue:Roles
    }
  ],
  controllers: [RolesController],
  exports:[RolesService]
})
export class RolesModule {}
