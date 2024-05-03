// If we look closely on the documentation an the practises The name suggest that it is and AuthGuard('jwt') in the brackets we have 'jwt' which means that this file is the extention of the file jwt.strategy.ts on auth folder similarly the local-auth.guard.ts is the extention file of the local.strategy.ts file

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}