import { Component, computed } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export default class ProductListPage {

  products = computed(() => {
    return this.api.products();
  });

  constructor(private api: ProductsService) {}
}
