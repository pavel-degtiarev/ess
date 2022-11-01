import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

export const API_KEY = 'API_KEY';

@Injectable()
export class StorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
