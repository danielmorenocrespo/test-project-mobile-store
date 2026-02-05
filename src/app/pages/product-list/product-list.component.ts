import { Component, computed, signal, OnInit, inject } from '@angular/core';
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
export default class ProductListPage implements OnInit{

  private api = inject(ProductsService);

  search = signal('');

  filtered = computed(() => {
    const query = this.search().toLowerCase();
    return this.api.getProducts().filter(product =>
      `${product.brand} ${product.model}`.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {

    this.api.loadProducts();
  }

  onSearch(value: string) {
    this.search.set(value);
  }
}
