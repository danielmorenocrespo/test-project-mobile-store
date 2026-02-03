import { Routes } from '@angular/router';
import ProductListPage from './pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
