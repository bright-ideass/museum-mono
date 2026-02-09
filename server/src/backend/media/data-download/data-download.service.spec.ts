import { Test, TestingModule } from '@nestjs/testing';
import { DataDownloadService } from './data-download.service';

describe('DataDownloadService', () => {
  let service: DataDownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataDownloadService],
    }).compile();

    service = module.get<DataDownloadService>(DataDownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
