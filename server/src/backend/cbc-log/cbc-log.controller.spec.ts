import { Test, TestingModule } from '@nestjs/testing';
import { CbcLogController } from './cbc-log.controller';

describe('CbcLogController', () => {
  let controller: CbcLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbcLogController],
    }).compile();

    controller = module.get<CbcLogController>(CbcLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
