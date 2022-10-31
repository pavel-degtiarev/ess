import { Component} from '@angular/core';
import { LockService } from 'src/app/services/lock.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-button-create',
  templateUrl: './button-create.component.html',
  styleUrls: ['./button-create.component.scss'],
})
export class ButtonCreateComponent {

  constructor(
    private usersService: UsersService,
    public lockService: LockService
  ) {}

  clickHandler() {
    this.lockService.isLocked = true;
    this.usersService.addEmptyUser();
  }
}
