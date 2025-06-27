import { TestBed } from '@angular/core/testing';

import { ApiService } from './fetch-data.service';

describe('fetchData', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
