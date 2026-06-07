import { Test, TestingModule } from '@nestjs/testing';
import { PartenarshipService } from './partenarship.service';

describe('PartenarshipService', () => {
  let service: PartenarshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartenarshipService],
    }).compile();

    service = module.get<PartenarshipService>(PartenarshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
