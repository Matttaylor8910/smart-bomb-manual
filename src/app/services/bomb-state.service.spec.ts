import { TestBed } from '@angular/core/testing';

import { BombStateService } from './bomb-state.service';

describe('BombStateService', () => {
  let service: BombStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BombStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
