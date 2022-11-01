import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from 'src/app//components/users-list/users-list.component';
import { ApiKeyInputComponent } from 'src/app/components/api-key-input/api-key-input.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'api-key', component: ApiKeyInputComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
