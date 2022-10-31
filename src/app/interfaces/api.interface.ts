import { Observable } from 'rxjs';
import { IUser } from './user.interface';

export interface IApi {
  get: () => Observable<IUser[]>;
  post: (user: IUser) => Observable<IUser>;
  put: (id: string, user: IUser) => Observable<void>;
  delete: (id: string) => Observable<void>;
}
