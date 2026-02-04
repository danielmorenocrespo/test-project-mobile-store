import { Component, computed, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, HttpClientModule, SearchBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export default class ProductListPage {

  search = signal('');

  filtered = computed(() => {
    const query = this.search().toLowerCase();
    return this.api.products().filter(product =>
      `${product.brand} ${product.model}`.toLowerCase().includes(query)
    );
  });

  constructor(private api: ProductsService) { }

  onSearch(value: any) {
    this.search.set(value);
  }
}
