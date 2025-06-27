import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base = environment.apiBase;
  constructor() {}

  async fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(this.base.concat(url));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}