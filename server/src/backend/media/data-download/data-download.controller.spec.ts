import { Test, TestingModule } from '@nestjs/testing';
import { DataDownloadController } from './data-download.controller';

describe('DataDownloadController', () => {
  let controller: DataDownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataDownloadController],
    }).compile();

    controller = module.get<DataDownloadController>(DataDownloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
