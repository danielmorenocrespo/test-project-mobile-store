import { Component, signal, computed, effect, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartStore } from '../../core/services/cart.store.service';
import { Product } from '../../core/models/product.model';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsPage implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private api = inject(ProductsService);
  private cart = inject(CartStore);
  form!: FormGroup;
  product = signal<Product | null>(null);

  cameras = computed(() =>
    [this.product()?.primaryCamera, this.product()?.secondaryCmera]
      .filter(cam => cam?.length)
      .length
  );

  private initEffect = effect(() => {
    const product = this.product();
    if (!product) return;

    if (product?.options?.colors?.length === 1) {
      this.form.controls?.['color'].setValue(product.options.colors[0].name);
    }

    if (product?.options?.storages?.length === 1) {
      this.form.controls?.['storage'].setValue(product.options.storages[0].name);
    }
  });


  ngOnInit(): void {

    this.form = this.fb.group({
      color: ['', Validators.required],
      storage: ['', Validators.required]
    });

    this.loadProduct();
  }

  private async loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const product: Product | null = await this.api.loadProduct(id);
    this.product.set(product);
  }

  async addToCart() {
    if (this.form.invalid || !this.product()) return;

    const { color, storage } = this.form.value;
    const count = await this.api.addToCart(this.product()!.id, color, storage);
    this.cart.set(count);
  }
}
