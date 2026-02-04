import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private _count = signal(0);

  readonly count = this._count.asReadonly();

  readonly hasItems = computed(() => this._count() > 0);

  set(value: number) {
    this._count.set(value);
  }
}
