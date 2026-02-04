import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CacheService } from '../cache/cache.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  baseUrl = '/api';
  products = signal<any[]>([]);


  constructor(
    private http: HttpClient,
    private cache: CacheService

  ) { }

  loadProducts() {
    const cached = this.cache.getLocalStorage('products');

      if (cached) {

        this.products.set(cached);
        return;
      } else {

        this.http.get<any[]>(`${this.baseUrl}/product`)
          .subscribe(data => {
            this.products.set(data);
            this.cache.setLocalStorage('products', data)
          });
      }
    }

  async loadProduct(id: string) {
      return this.http
        .get<any>(`${this.baseUrl}/product/${id}`)
        .toPromise();
  }

  async addToCart(id: string, color: string, storage: string) {
    const res: any = await this.http
      .post(`${this.baseUrl}/cart`, {
        id,
        colorCode: color,
        storageCode: storage
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .toPromise();


    return res.count;
  }
}
