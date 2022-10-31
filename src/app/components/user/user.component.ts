import { Component, Input, OnInit } from '@angular/core';
import { BUTTON } from 'src/app/interfaces/button.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { STATE, TState, IState } from 'src/app/interfaces/state.interface';
import { LockService } from 'src/app/services/lock.service';
import { UsersService } from 'src/app/services/users.service';
import { FormService } from 'src/app/services/form.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss',
    '../users-list/users-list.component.scss',
  ],
  providers: [FormService, ValidateService],
})
export class UserComponent implements OnInit, IState {
  @Input() user: IUser;
  state: TState;

  handlers = {
    [BUTTON.EDIT]: this.editUser.bind(this),
    [BUTTON.DELETE]: this.deleteUser.bind(this),
    [BUTTON.CANCEL]: this.cancelEditUser.bind(this),
    [BUTTON.SAVE]: this.saveUser.bind(this),
  };

  constructor(
    private usersService: UsersService,
    public lockService: LockService,
    public formService: FormService
  ) {
    this.onHover = this.onHover.bind(this);
  }

  get ownState() {
    return this.state;
  }

  set ownState(newState: TState) {
    if (this.state === newState) return;
    this.state = newState;
    this.lockService.setState(this.state);
  }

  get ownStateIsLocked() {
    return [STATE.EDIT, STATE.ADD].includes(this.ownState);
  }

  // если у текущей записи нет id, значит это только что созданная запись.
  // переводим ее в STATE.ADD (при этом глобальное сотояние запирается)
  // и запускаем редактирование
  ngOnInit(): void {
    this.ownState = this.user._id ? STATE.IDLE : STATE.ADD;

    if (this.ownState === STATE.ADD) {
      this.editUser();
    }
  }

  // если глобальное сотояние не заперто, то запись переходит в STATE.ACTIVE.
  // при этом рисуется соответствующий STATE.ACTIVE набор кнопок.
  onHover(isHovered: boolean): void {
    if (this.lockService.isLocked) return;
    this.ownState = isHovered ? STATE.ACTIVE : STATE.IDLE;
  }

  // если попали сюда после добавления записи, то ownStateIsLocked == true
  editUser() {
    if (!this.ownStateIsLocked) {
      this.ownState = STATE.EDIT;
    }
    this.formService.createForm(this.user);
  }

  // если нет id, значит отказываемся созавать новую запись.
  // нужно ее удалить из списка users.
  // иначе просто переводим запись в STATE.IDLE.
  // список users трогать не нужно, в нем ничего не менялось.
  // все изменения остались в this.formService
  cancelEditUser() {
    if (!this.user._id) {
      this.usersService.delete();
    }
    this.ownState = STATE.IDLE;
  }

  saveUser() {
    const result = this.formService.validate();
    if (!result.isOk) {
      alert(result.message);
      return;
    }

    // _id может быть, может не быть. usersService сам разберется.
    // ownState меняем в коллбэке потому, что usersService.save - асинхронная,
    // а ownState должно измениться только после завершения save.
    this.usersService.save(
      this.user._id,
      this.formService.clearedFields,
      () => (this.ownState = STATE.IDLE)
    );
  }

  deleteUser() {
    this.usersService.delete(this.user._id);
    this.ownState = STATE.IDLE;
  }
}
