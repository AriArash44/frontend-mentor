import { Component } from '@angular/core';
import { QaLayoutComponent } from '../../layouts/qa-layout/qa-layout.component';
import { AccordionComponent } from '../../components/atoms/accordion/accordion.component';

@Component({
  selector: 'app-qa-page',
  imports: [QaLayoutComponent, AccordionComponent],
  templateUrl: './qa-page.component.html',
  styleUrl: './qa-page.component.scss'
})
export class QaPageComponent {

}
