import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, delay, finalize, of } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { NotificationService } from '@core/services/notification.service';
import { Product } from '@models/product.model';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Starter Seat', sku: 'ST-001', price: 49.9, active: true },
  { id: 2, name: 'Enterprise Seat', sku: 'ENT-009', price: 119.9, active: true },
  { id: 3, name: 'Legacy Seat', sku: 'LEG-002', price: 29.9, active: false },
];

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private readonly api = inject(ApiService);
  private readonly notification = inject(NotificationService);

  private readonly itemsState = signal<Product[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);
  private readonly filterState = signal('');

  readonly items = computed(() => this.itemsState());
  readonly loading = computed(() => this.loadingState());
  readonly error = computed(() => this.errorState());
  readonly filteredItems = computed(() => {
    const filter = this.filterState().toLowerCase().trim();
    if (!filter) {
      return this.itemsState();
    }

    return this.itemsState().filter(
      (item) => item.name.toLowerCase().includes(filter) || item.sku.toLowerCase().includes(filter),
    );
  });

  load(): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.api
      .get<Product[]>('/products')
      .pipe(
        catchError(() => {
          this.errorState.set('API unavailable. Rendering local fallback data.');
          return of(MOCK_PRODUCTS);
        }),
        delay(300),
        finalize(() => this.loadingState.set(false)),
      )
      .subscribe((products) => this.itemsState.set(products));
  }

  setFilter(value: string): void {
    this.filterState.set(value);
  }

  create(product: Omit<Product, 'id'>): void {
    const nextId = Math.max(0, ...this.itemsState().map((item) => item.id)) + 1;
    this.itemsState.update((items) => [...items, { ...product, id: nextId }]);
    this.notification.success('Product created successfully');
  }

  update(product: Product): void {
    this.itemsState.update((items) =>
      items.map((item) => (item.id === product.id ? product : item)),
    );
    this.notification.success('Product updated successfully');
  }

  remove(id: number): void {
    this.itemsState.update((items) => items.filter((item) => item.id !== id));
    this.notification.success('Product removed successfully');
  }
}
