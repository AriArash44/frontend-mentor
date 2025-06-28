import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccordionStateService } from '../../Injectables/accordionState/accordion-state.service';

describe('AccordionComponent', () => {
  let fixture: ComponentFixture<AccordionComponent>;
  let component: AccordionComponent;
  let accordionState: AccordionStateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatExpansionModule, AccordionComponent],
      providers: [AccordionStateService],
    });
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    accordionState = TestBed.inject(AccordionStateService);
    fixture.componentRef.setInput('index', 1);
    fixture.componentRef.setInput('header', 'Title');
    fixture.componentRef.setInput('description', 'Details');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect open state based on AccordionStateService', () => {
    accordionState.openIndex.set(1);
    expect(component.isOpen()).toBeTrue();
    accordionState.openIndex.set(2);
    expect(component.isOpen()).toBeFalse();
  });

  it('should call toggle() and update openIndex', () => {
    spyOn(accordionState, 'toggle').and.callThrough();
    component.toggle();
    expect(accordionState.toggle).toHaveBeenCalledWith(1);
  });
});
