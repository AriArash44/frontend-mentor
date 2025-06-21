import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenButtonComponent } from './open-button.component';

describe('OpenButtonComponent', () => {
  let component: OpenButtonComponent;
  let fixture: ComponentFixture<OpenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
