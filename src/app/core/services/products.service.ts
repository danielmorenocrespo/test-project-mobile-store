import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  baseUrl = 'https://itx-frontend-test.onrender.com/api';
  products = signal<any[]>([]);


  constructor(
    private http: HttpClient,
  ) {

    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>(`${this.baseUrl}/product`)
      .subscribe(data => {
        this.products.set(data);
      });
  }
}
