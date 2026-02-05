import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CacheService } from '../cache/cache.service';
import { mockProducts } from '../../mocks/mock-products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let cacheService: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService, CacheService]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load products from cache if available', () => {
    jest.spyOn(cacheService, 'getLocalStorage').mockReturnValue(mockProducts);

    service.loadProducts();

    expect(service.getProducts()).toEqual(mockProducts);
  });

  it('should call HTTP if no cache', () => {
    jest.spyOn(cacheService, 'getLocalStorage').mockReturnValue(null);

    service.loadProducts();

    const req = httpMock.expectOne('/api/product');
    req.flush(mockProducts);

    expect(service.getProducts()).toEqual(mockProducts);
    expect(cacheService.getLocalStorage).toHaveBeenCalledWith('products');
  });

  it('should add product to cart and return count', async () => {
    service.addToCart = jest.fn().mockResolvedValue(2);
    const count = await service.addToCart('1', 'black', '128');
    expect(count).toBe(2);
  });
});
