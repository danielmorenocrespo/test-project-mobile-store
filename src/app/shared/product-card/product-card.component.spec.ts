import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCardComponent } from './product-card.component';
import { mockProduct } from '../../mocks/mock-product';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should render brand and model', () => {
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain(mockProduct.brand);
    expect(el.textContent).toContain(mockProduct.model);
  });

  it('should render price', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain(mockProduct.price);
  });

  it('should render image alt correctly', () => {
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img.alt).toBe(`${mockProduct.brand} ${mockProduct.model}`);
  });
});
