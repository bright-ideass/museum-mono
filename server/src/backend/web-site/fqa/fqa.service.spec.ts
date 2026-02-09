import { Test, TestingModule } from '@nestjs/testing';
import { FqaService } from './fqa.service';

describe('FqaService', () => {
  let service: FqaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FqaService],
    }).compile();

    service = module.get<FqaService>(FqaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
