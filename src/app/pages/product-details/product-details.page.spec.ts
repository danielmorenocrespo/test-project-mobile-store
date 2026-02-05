import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsPage } from './product-details.component';
import { ProductsService } from '../../core/services/products.service';
import { CartStore } from '../../core/services/cart.store.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { mockProduct } from '../../mocks/mock-product';

describe('ProductDetailsPage', () => {
  let component: ProductDetailsPage;
  let fixture: ComponentFixture<ProductDetailsPage>;
  let productsService: jest.Mocked<ProductsService>;
  let cartStore: CartStore;

  beforeEach(async () => {
    const productsServiceMock = {
      loadProduct: jest.fn(),
      addToCart: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailsPage, ReactiveFormsModule],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceMock,
        },
        CartStore,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsPage);
    component = fixture.componentInstance;

    productsService = TestBed.inject(
      ProductsService
    ) as jest.Mocked<ProductsService>;

    cartStore = TestBed.inject(CartStore);
  });

  it('should add product to cart and update cart store', async () => {
    productsService.loadProduct.mockResolvedValue(mockProduct);
    productsService.addToCart.mockResolvedValue(2);

    await component.ngOnInit();

    await fixture.whenStable();

    component.form.setValue({
      color: 'Negro',
      storage: '128GB',
    });

    await component.addToCart();

    expect(productsService.addToCart).toHaveBeenCalledTimes(1);
    expect(productsService.addToCart).toHaveBeenCalledWith(
      '1',
      'Negro',
      '128GB'
    );
    expect(cartStore.count()).toBe(2);
  });

  it('should not add product to cart if form is invalid', async () => {
    productsService.loadProduct.mockResolvedValue(mockProduct);
    await component.ngOnInit();

    component.form.setValue({
      color: '',
      storage: '',
    });

    await component.addToCart();

    expect(productsService.addToCart).not.toHaveBeenCalled();
    expect(cartStore.count()).toBe(0);
  });
});
