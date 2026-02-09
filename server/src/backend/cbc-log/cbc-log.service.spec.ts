import { Test, TestingModule } from '@nestjs/testing';
import { CbcLogService } from './cbc-log.service';

describe('CbcLogService', () => {
  let service: CbcLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CbcLogService],
    }).compile();

    service = module.get<CbcLogService>(CbcLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
