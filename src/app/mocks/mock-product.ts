import { Product } from '../core/models/product.model';

export const mockProduct: Product = {
  id: '1',
  brand: 'Acer',
  model: 'Iconia Talk S',
  price: '170',
  imgUrl: 'assets/img/png.png',
  cpu: 'Hexa-core (4x1.4 GHz Cortex-A53 & 2x1.8 GHz Cortex-A57)',
  ram: '3 GB RAM',
  os: 'Android 6.0 (Marshmallow)',
  displaySize: '1080 x 1920 pixels (~401 ppi pixel density)',
  battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
  dimentions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
  weight: '260',
  primaryCamera: [
    '13 MP',
    'autofocus'
  ],
  secondaryCmera: [
    '2 MP',
    '720p'
  ],
  options: {
    colors: [
      {
        code: '1000',
        name: 'Black'
      }
    ],
    storages: [
      {
        code: '2000',
        name: '16 GB'
      },
      {
        code: '2001',
        name: '32 GB'
      }
    ]
  }
};
