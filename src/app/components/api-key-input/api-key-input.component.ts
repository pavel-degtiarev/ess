import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_URL } from 'src/app/modules/routing/routing.module';
import { API_KEY, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-api-key-input',
  templateUrl: './api-key-input.component.html',
  styleUrls: ['./api-key-input.component.scss'],
})
export class ApiKeyInputComponent implements OnInit {
  apiKeyField: string;

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.apiKeyField = this.storageService.getItem(API_KEY) ?? '';
  }

  saveNewApiKey() {
    this.storageService.setItem(API_KEY, this.apiKeyField);
    this.router.navigate([HOME_URL]);
  }
}
