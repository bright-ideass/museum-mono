import { Test, TestingModule } from '@nestjs/testing';
import { FqaController } from './fqa.controller';

describe('FqaController', () => {
  let controller: FqaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FqaController],
    }).compile();

    controller = module.get<FqaController>(FqaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
