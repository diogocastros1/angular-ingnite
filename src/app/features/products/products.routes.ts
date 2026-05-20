import { Routes } from '@angular/router';
import { ProductsPage } from '@features/products/pages/products-page/products-page';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
];
