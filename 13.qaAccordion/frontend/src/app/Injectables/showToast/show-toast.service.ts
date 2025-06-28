import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root'
})
export class ShowToastService {
  show(message: string): void {
    Toastify({
      text: message,
      duration: 2000,
      newWindow: true,
      close: false,
      gravity: 'top',
      position: 'left',
      stopOnFocus: true,
      style: {
        background: '#FFFFFF',
        border: '1px solid #FF0000',
        color: '#FF0000',
        direction: 'rtl',
        'border-radius': '5px'
      }
    }).showToast();
  }
}