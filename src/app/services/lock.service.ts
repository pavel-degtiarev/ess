import { Injectable } from '@angular/core';
import { STATE, TState } from '../interfaces/state.interface';

// сервис хранит глобальное состояние isLocked.
// когда запись user переходит из IDLE в состояние EDIT,
// флаг isLocked поднимается, и все остальные записи не смогут изменить свое состояние.
// это гарантирует, что редактируется только одна запись.

// то же самое и с добавлением новой записи.
// когда запись добавляется, у нее нет id, и она сама переходит в режим ADD,
// блокируя глобальное состояние

@Injectable()
export class LockService {
  isLocked: boolean = false;

  setState(state: TState): void {
    this.isLocked = [STATE.EDIT, STATE.ADD].includes(state);
  }
}
