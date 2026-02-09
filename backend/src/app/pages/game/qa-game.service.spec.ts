import { TestBed } from '@angular/core/testing';

import { QaGameService } from './qa-game.service';

describe('QaGameService', () => {
  let service: QaGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
