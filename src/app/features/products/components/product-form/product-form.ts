import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Product } from '@models/product.model';
import { FormCard } from '@shared/ui/form-card/form-card';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormCard,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  private readonly formBuilder = inject(FormBuilder);

  @Input() set editingProduct(product: Product | null) {
    if (!product) {
      this.form.reset({ id: null, name: '', sku: '', price: 0, active: true });
      return;
    }

    this.form.patchValue(product);
  }

  @Output() readonly save = new EventEmitter<Omit<Product, 'id'> | Product>();
  @Output() readonly cancelForm = new EventEmitter<void>();

  readonly form = this.formBuilder.group({
    id: this.formBuilder.control<number | null>(null),
    name: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    sku: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    price: this.formBuilder.nonNullable.control(0, [Validators.required, Validators.min(1)]),
    active: this.formBuilder.nonNullable.control(true),
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();
    if (value.id === null) {
      this.save.emit({
        name: value.name,
        sku: value.sku,
        price: value.price,
        active: value.active,
      });
      this.form.reset({ id: null, name: '', sku: '', price: 0, active: true });
      return;
    }

    this.save.emit({
      id: value.id,
      name: value.name,
      sku: value.sku,
      price: value.price,
      active: value.active,
    });
  }
}
