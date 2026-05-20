import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-data-table',
  imports: [MatButtonModule, CurrencyPipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTable {
  @Input({ required: true }) columns: string[] = [];
  @Input({ required: true }) rows: Product[] = [];

  @Output() readonly editRow = new EventEmitter<Product>();
  @Output() readonly deleteRow = new EventEmitter<Product>();

  trackById(_: number, row: Product): number {
    return row.id;
  }
}
