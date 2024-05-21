import { Test, TestingModule } from '@nestjs/testing';
import { RolesUserGroupController } from './roles-user-group.controller';

describe('RolesUserGroupController', () => {
  let controller: RolesUserGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesUserGroupController],
    }).compile();

    controller = module.get<RolesUserGroupController>(RolesUserGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
