import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  baseUrl = '/api';
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
