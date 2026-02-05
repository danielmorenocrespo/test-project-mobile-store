import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CacheService } from '../cache/cache.service';
import { firstValueFrom } from 'rxjs';

interface CartResponse {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private http = inject(HttpClient);
  private cache = inject(CacheService);

  baseUrl = '/api';
  private products = signal<Product[]>([]);


  getProducts() {
    return this.products();
  }

  loadProducts(): void {
    const cached = this.cache.getLocalStorage('products');

      if (cached) {

        this.products.set(cached);
      } else {

        this.http.get<Product[]>(`${this.baseUrl}/product`)
          .subscribe(data => {
            this.products.set(data);
            this.cache.setLocalStorage('products', data)
          });
      }
  }

  async loadProduct(id: string): Promise<Product | null> {

    return await firstValueFrom(

      this.http.get<Product>(`${this.baseUrl}/product/${id}`)
    )
  }

  async addToCart(id: string, color: string, storage: string): Promise<number> {

    const res = await firstValueFrom(this.http
      .post<CartResponse>(`${this.baseUrl}/cart`, {
        id,
        colorCode: color,
        storageCode: storage
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }))

    return res.count;
  }
}
