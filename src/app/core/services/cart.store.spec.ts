import { CartStore } from './cart.store.service';

describe('CartStore', () => {
  let store: CartStore;

  beforeEach(() => {
    store = new CartStore();
  });

  it('should initialize count to 0', () => {
    expect(store.count()).toBe(0);
  });

  it('should set count correctly', () => {
    store.set(5);
    expect(store.count()).toBe(5);
  });

  it('should compute hasItems correctly', () => {
    store.set(0);
    expect(store.hasItems()).toBe(false);

    store.set(2);
    expect(store.hasItems()).toBe(true);
  });
});
