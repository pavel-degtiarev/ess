import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IApi } from '../interfaces/api.interface';
import { IUser } from '../interfaces/user.interface';
import { InformerService } from './informer.service';
import { API_KEY, StorageService } from './storage.service';

const URL = `https://crudcrud.com`;

const LOADING_MSG = 'Loading...';
const GENERAL_ERROR_MSG = 'Data access error. Try reload page.';

@Injectable()
export class ApiService implements IApi {

  constructor(
    private http: HttpClient,
    private informerService: InformerService,
    private storageService: StorageService
  ) {
    this.errorHandler = this.errorHandler.bind(this);
  }

  get url(): string {
    return `${URL}/api/${this.storageService.getItem(API_KEY)}`;
  }

  get(): Observable<IUser[]> {
    this.informerService.message = LOADING_MSG;
    return this.http.get<IUser[]>(`${this.url}/user`).pipe(
      tap(() => (this.informerService.message = '')),
      catchError(this.errorHandler)
    );
  }

  post(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.url}/user`, user)
      .pipe(catchError(this.errorHandler));
  }

  put(id: string, user: IUser): Observable<void> {
    return this.http
      .put<void>(`${this.url}/user/${id}`, user)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/user/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  // вместо этого метода можно инжектить отдельный сервис обработки ошибок
  // и передавать ошибку ему.
  errorHandler(error: any) {
    console.log(error.message);
    this.informerService.message = GENERAL_ERROR_MSG;
    return throwError(() => new Error(GENERAL_ERROR_MSG));
  }
}
