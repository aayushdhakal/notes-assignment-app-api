import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ROLES_REPOSITORY } from 'src/core/constants';
import { Roles } from 'src/core/db/models/roles.model';

@Module({
  providers: [
    RolesService,
    {
      provide:ROLES_REPOSITORY,
      useValue:Roles
    }
  ]
})
export class RolesModule {}
