import { Injectable } from '@angular/core';


const TTL = 60 * 60 * 1000;


@Injectable({ providedIn: 'root' })
export class CacheService {


  getLocalStorage(key: string) {
    const localStorageData = localStorage.getItem(key);
    if (!localStorageData) return null;


    const { data, timestamp } = JSON.parse(localStorageData);
    if (Date.now() - timestamp > TTL) {
      localStorage.removeItem(key);
      return null;
    }


    return data;
  }


  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }
}
