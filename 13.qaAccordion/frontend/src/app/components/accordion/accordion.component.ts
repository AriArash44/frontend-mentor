import { Component, input, computed, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccordionStateService } from '../../Injectables/accordionState/accordion-state.service';

@Component({
  selector: 'accordion',
  imports: [MatExpansionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  index = input.required<number>();
  header = input("");
  description = input("");
  accordion = inject(AccordionStateService);
  isOpen = computed(() => this.accordion.openIndex() === this.index());
  toggle() {
    this.accordion.toggle(this.index());
  }
}