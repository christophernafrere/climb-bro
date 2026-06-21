import { Test, TestingModule } from '@nestjs/testing';
import { ClimbingSessionService } from './climbing-session.service';

describe('ClimbingSessionService', () => {
  let service: ClimbingSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbingSessionService],
    }).compile();

    service = module.get<ClimbingSessionService>(ClimbingSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
