import { Component, input, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'accordion',
  imports: [MatExpansionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  readonly panelOpenState = signal(false);
  header = input("");
  description = input("");
}