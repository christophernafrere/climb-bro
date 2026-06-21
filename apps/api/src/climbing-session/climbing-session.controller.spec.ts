import { Test, TestingModule } from '@nestjs/testing';
import { ClimbingSessionController } from './climbing-session.controller';

describe('ClimbingSessionController', () => {
  let controller: ClimbingSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbingSessionController],
    }).compile();

    controller = module.get<ClimbingSessionController>(ClimbingSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
