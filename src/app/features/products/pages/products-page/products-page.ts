import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DialogService } from '@core/services/dialog.service';
import { ProductStore } from '@features/products/data/product.store';
import { Product } from '@models/product.model';
import { DataTable } from '@shared/ui/data-table/data-table';
import { ProductForm } from '@features/products/components/product-form/product-form';

@Component({
  selector: 'app-products-page',
  imports: [ReactiveFormsModule, DataTable, ProductForm],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  private readonly store = inject(ProductStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(DialogService);

  readonly columns = ['id', 'name', 'sku', 'price', 'active'];
  readonly products = this.store.filteredItems;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly editingProduct = signal<Product | null>(null);
  readonly filterControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.store.load();
    this.filterControl.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.store.setFilter(value));
  }

  onSave(product: Omit<Product, 'id'> | Product): void {
    if ('id' in product) {
      this.store.update(product);
      this.editingProduct.set(null);
      return;
    }

    this.store.create(product);
  }

  edit(product: Product): void {
    this.editingProduct.set(product);
  }

  cancelEdit(): void {
    this.editingProduct.set(null);
  }

  remove(product: Product): void {
    this.dialogService
      .confirm('Delete product', `Do you want to remove ${product.name}?`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.remove(product.id);
        }
      });
  }
}
