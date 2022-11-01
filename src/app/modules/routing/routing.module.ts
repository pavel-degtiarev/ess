import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from 'src/app//components/users-list/users-list.component';
import { ApiKeyInputComponent } from 'src/app/components/api-key-input/api-key-input.component';
import { LockGuard } from 'src/app/guards/lock.guard';

const HOME = '';
const APIKEY = 'api-key';

export const HOME_URL = `/${HOME}`;
export const APIKEY_URL = `/${APIKEY}`;

const routes: Routes = [
  { path: HOME, component: UsersListComponent },
  { path: APIKEY, component: ApiKeyInputComponent, canActivate: [LockGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: [LockGuard],
  exports: [RouterModule],
})
export class RoutingModule {}
