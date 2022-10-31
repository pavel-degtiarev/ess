import { Component, OnInit } from '@angular/core';
import { InformerService } from 'src/app/services/informer.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public informerService: InformerService
  ) {}

  ngOnInit(): void {
    if (!this.informerService.message) this.usersService.load();
  }
}
