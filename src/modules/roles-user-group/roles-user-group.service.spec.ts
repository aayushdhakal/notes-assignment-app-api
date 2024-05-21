import { Test, TestingModule } from '@nestjs/testing';
import { RolesUserGroupService } from './roles-user-group.service';

describe('RolesUserGroupService', () => {
  let service: RolesUserGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesUserGroupService],
    }).compile();

    service = module.get<RolesUserGroupService>(RolesUserGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
