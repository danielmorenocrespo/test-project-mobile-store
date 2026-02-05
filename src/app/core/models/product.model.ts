export interface Product {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  cpu?: string;
  ram?: string;
  os?: string;
  display?: string;
  battery?: string;
  dimentions?: string;
  weight?: string;
  primaryCamera?: string[];
  secondaryCmera?: string[];
  displaySize?: string;
  options?: ProductOptions;
}


export interface ProductOptions {
  colors?: ProductOption[];
  storages?: ProductOption[];
}

export interface ProductOption {
  code?: string;
  name?: string;
}
