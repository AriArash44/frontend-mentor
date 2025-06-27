import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccordionStateService {
  openIndex = signal<number | null>(null);
  toggle(index: number) {
    this.openIndex.update(current => (current === index ? null : index));
  }
}
