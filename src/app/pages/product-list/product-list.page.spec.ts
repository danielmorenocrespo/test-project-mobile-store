import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import ProductListPage from './product-list.component';
import { ProductsService } from '../../core/services/products.service';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;
  let productsServiceMock: any;

  const mockProducts = [
    {
      id: '1',
      brand: 'Acer',
      model: 'Iconia Talk S',
      price: 170,
      imgUrl: 'img.png',
    },
    {
      id: '2',
      brand: 'Alcatel',
      model: 'Liquid Jade 2',
      price: 200,
      imgUrl: 'img.png',
    },
  ];

  beforeEach(async () => {
    productsServiceMock = {
      getProducts: jest.fn(() => mockProducts),
      loadProducts: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductListPage, RouterTestingModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should filter products based on search signal', () => {
    component.search.set('Acer');

    const result = component.filtered();

    expect(result.length).toBe(1);
    expect(result[0].brand).toBe('Acer');

    component.search.set('Alcatel');

    const result2 = component.filtered();
    expect(result2.length).toBe(1);
    expect(result2[0].brand).toBe('Alcatel');
  });
});
