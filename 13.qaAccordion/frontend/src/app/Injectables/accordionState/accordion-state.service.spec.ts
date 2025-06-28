import { AccordionStateService } from './accordion-state.service';

describe('AccordionStateService', () => {
  let service: AccordionStateService;
  beforeEach(() => {
    service = new AccordionStateService();
  });

  it('should toggle indices correctly', () => {
    service.toggle(1);
    expect(service.openIndex()).toBe(1);
    service.toggle(1);
    expect(service.openIndex()).toBeNull();
    service.toggle(2);
    expect(service.openIndex()).toBe(2);
  });
});
