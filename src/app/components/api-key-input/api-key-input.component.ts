import { Component, OnInit } from '@angular/core';
import { LockService } from 'src/app/services/lock.service';
import { API_KEY, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-api-key-input',
  templateUrl: './api-key-input.component.html',
  styleUrls: ['./api-key-input.component.scss', '../../../styles/link.scss'],
})
export class ApiKeyInputComponent implements OnInit {
  apiKeyField: string;

  constructor(
    private storageService: StorageService,
    public lockService: LockService
  ) {}

  ngOnInit(): void {
    this.apiKeyField = this.storageService.getItem(API_KEY) ?? '';
  }

  saveNewApiKey() {
    this.storageService.setItem(API_KEY, this.apiKeyField);
  }
}
