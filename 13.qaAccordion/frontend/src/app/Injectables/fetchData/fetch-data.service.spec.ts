import { TestBed } from '@angular/core/testing';
import { ApiService } from './fetch-data.service';

describe('fetchData', () => {
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should return data on successful fetch', async () => {
    const mockData = { foo: 'bar' };
    spyOn(window, 'fetch').and.resolveTo(new Response(
      JSON.stringify(mockData),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));
    const result = await service.fetchData('some-endpoint');
    expect(result).toEqual(mockData);
  });

  it('should throw an error on non-ok response', async () => {
    spyOn(window, 'fetch').and.resolveTo(new Response('', { status: 404 }));
    await expectAsync(service.fetchData('bad-url')).toBeRejectedWithError('HTTP error! status: 404');
  });

  it('should throw an error on fetch rejection', async () => {
    spyOn(window, 'fetch').and.rejectWith(new Error('Network failed'));
    await expectAsync(service.fetchData('some-url')).toBeRejectedWithError('Network failed');
  });
});
