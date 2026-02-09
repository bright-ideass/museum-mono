import { TestBed } from '@angular/core/testing';

import { CbcLogService } from './cbc-log.service';

describe('CbcLogService', () => {
  let service: CbcLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbcLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
