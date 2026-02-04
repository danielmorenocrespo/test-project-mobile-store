import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsPage implements OnInit {
  form: any;
  product = signal<any>(null);

  cameras = computed(() =>
    [this.product()?.primaryCamera, this.product()?.secondaryCmera]
      .filter(cam => cam?.length)
      .length
  );

 private initEffect = effect(() => {
    const product = this.product();
    if (!product) return;

    if (product.options.colors.length === 1) {
      this.form.controls.color.setValue(product.options.colors[0].name);
    }

    if (product.options.storages.length === 1) {
      this.form.controls.storage.setValue(product.options.storages[0].name);
    }
  });


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ProductsService,
  ) { }


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

    const product = await this.api.loadProduct(id);
    this.product.set(product);
  }
}
