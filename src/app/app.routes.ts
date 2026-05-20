import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { Shell } from '@core/layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadChildren: () =>
          import('@features/products/products.routes').then((m) => m.PRODUCT_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
