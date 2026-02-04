import { Routes } from '@angular/router';
import ProductListPage from './pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListPage,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/product-details/product-details.component')
        .then(m => m.ProductDetailsPage)
  },
  {
    path: '**',
    redirectTo: '',
  },
];
