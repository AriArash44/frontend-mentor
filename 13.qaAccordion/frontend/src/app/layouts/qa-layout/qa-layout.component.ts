import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'qa-layout',
  imports: [CardComponent],
  templateUrl: './qa-layout.component.html',
  styleUrl: './qa-layout.component.scss'
})
export class QaLayoutComponent {

}
