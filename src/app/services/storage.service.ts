import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

export const API_KEY = 'API_KEY';

interface StorageRecord {
  key: string;
  value: string;
}

@Injectable()
export class StorageService {
  storage: Storage;
  storageChanged: Subject<StorageRecord>;

  constructor() {
    this.storage = window.localStorage;
    this.storageChanged = new Subject<StorageRecord>();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
    this.storageChanged.next({ key, value });
  }
}
