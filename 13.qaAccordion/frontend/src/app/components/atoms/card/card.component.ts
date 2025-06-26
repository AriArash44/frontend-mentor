import { Component, ElementRef, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'card',
  imports: [NgClass],
  templateUrl: './card.component.html'
})

export class CardComponent implements OnInit {
  hostClasses = '';
  constructor(private hostRef: ElementRef) {}
  ngOnInit() {
    this.hostClasses = this.hostRef.nativeElement.className;
  }
}