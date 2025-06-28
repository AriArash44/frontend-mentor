import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QaPageComponent } from './qa-page.component';
import { ApiService } from '../../Injectables/fetchData/fetch-data.service';
import { ShowToastService } from '../../Injectables/showToast/show-toast.service';

describe('QaPageComponent', () => {
  let fixture: ComponentFixture<QaPageComponent>;
  let component: QaPageComponent;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockToastService: jasmine.SpyObj<ShowToastService>;
  beforeEach(waitForAsync(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['fetchData']);
    mockToastService = jasmine.createSpyObj('ShowToastService', ['show']);
    TestBed.configureTestingModule({
      imports: [QaPageComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ShowToastService, useValue: mockToastService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(QaPageComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and set state on success', async () => {
    const fakeData = { question1: 'Answer 1', question2: 'Answer 2' };
    mockApiService.fetchData.and.resolveTo(fakeData);
    await component.ngOnInit();
    expect(mockApiService.fetchData).toHaveBeenCalledWith('qa');
    expect(component.loading()).toBeFalse();
    expect(component.error()).toBeNull();
    expect(component.data()).toEqual(fakeData);
    expect(component.faqs()).toEqual([
      { key: 'question1', value: 'Answer 1' },
      { key: 'question2', value: 'Answer 2' }
    ]);
  });

  it('should handle fetch error and show toast', async () => {
    mockApiService.fetchData.and.rejectWith(new Error('Network fail'));
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.error()).toBe('Failed to load data');
    expect(mockToastService.show).toHaveBeenCalledWith('Failed to load data');
  });
});
