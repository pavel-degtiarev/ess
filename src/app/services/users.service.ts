import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { GENDER, IUser } from '../interfaces/user.interface';

const userTemplate = {
  firstName: '',
  lastName: '',
  email: '',
  age: 1,
  gender: GENDER.MALE,
};

@Injectable()
export class UsersService {
  users: IUser[] = [];

  constructor(private api: ApiService) { }

  // добавляем новую запись в список users.
  // поскольку список изменился, angular отрисует новую запись,
  // а поскольку у этой записи нет id, она переключится в режим редактирования
  addEmptyUser(): void {
    this.users.push(userTemplate);
  }

  load(): void {
    this.api.get().subscribe((data) => (this.users = data));
  }

  // если id == undefined, значит сохраняем новую запись, иначе меняем существующую.
  // в callback передаем функцию переключения состояния и вызываем ее, когда поток завершился,
  // чтобы список на экране не дергался при переключении из EDIT или ADD в IDLE
  save(id: string | undefined, userData: IUser, callback?: () => void) {
    if (id) {
      this.api.put(id, userData).subscribe(() => {
        const index = this.users.findIndex((user) => user._id === id);
        this.users[index] = { _id: id, ...userData };
        callback && callback();
      });
    } else {
      this.api.post(userData).subscribe((resp) => {
        const index = this.users.length - 1;
        this.users[index] = resp;
        callback && callback();
      });
    }
  }

  // если id == undefined, нужно удалить новую запись.
  // на сервер она еще не отправлялась, надо просто убрать ее локально из списка users.
  delete(id?: string) {
    if (id) {
      this.api.delete(id).subscribe(() => {
        this.users = this.users.filter((user) => user._id !== id);
      });
    } else {
      this.users = this.users.filter((user) => user._id);
    }
  }
}
