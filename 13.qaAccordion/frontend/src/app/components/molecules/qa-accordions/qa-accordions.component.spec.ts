import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaAccordionsComponent } from './qa-accordions.component';

describe('QaAccordionsComponent', () => {
  let component: QaAccordionsComponent;
  let fixture: ComponentFixture<QaAccordionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaAccordionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaAccordionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
