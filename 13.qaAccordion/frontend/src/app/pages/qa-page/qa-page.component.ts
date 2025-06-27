import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaLayoutComponent } from '../../layouts/qa-layout/qa-layout.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { ApiService } from '../../Injectables/fetchData/fetch-data.service';

@Component({
  selector: 'qa-page',
  standalone: true,
  imports: [ CommonModule, QaLayoutComponent, AccordionComponent ],
  templateUrl: './qa-page.component.html',
  styleUrls: ['./qa-page.component.scss']
})
export class QaPageComponent {
  private api = inject(ApiService);
  loading = signal(true);
  error = signal<string|null>(null);
  data = signal<Record<string,string>>({});
  faqs = computed(() =>
    Object.entries(this.data()).map(([key, value]) => ({ key, value }))
  );
  async ngOnInit() {
    try {
      this.data.set(await this.api.fetchData('qa'));
    } catch {
      this.error.set('Failed to load data');
    } finally {
      this.loading.set(false);
    }
  }
}
