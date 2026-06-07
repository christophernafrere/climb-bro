import { Test, TestingModule } from '@nestjs/testing';
import { PartenarshipController } from './partenarship.controller';

describe('PartenarshipController', () => {
  let controller: PartenarshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartenarshipController],
    }).compile();

    controller = module.get<PartenarshipController>(PartenarshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
