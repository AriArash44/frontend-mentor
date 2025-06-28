import { TestBed } from '@angular/core/testing';

import { ShowToastService } from './show-toast.service';

describe('ShowToastService', () => {
  let service: ShowToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
