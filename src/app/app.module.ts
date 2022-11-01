import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { ButtonCreateComponent } from './components/button-create/button-create.component';
import { ButtonComponent } from './components/button/button.component';
import { ControlsComponent } from './components/controls/controls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LockService } from './services/lock.service';
import { UsersService } from './services/users.service';
import { OnHoverDirective } from './directives/on-hover.directive';
import { NoSpacesValidatorDirective } from './directives/no-spaces-validator.directive';
import { ApiService } from './services/api.service';
import { InformerComponent } from './components/informer/informer.component';
import { InformerService } from './services/informer.service';
import { ApiKeyInputComponent } from './components/api-key-input/api-key-input.component';
import { StorageService } from './services/storage.service';
import { RoutingModule } from './modules/routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    HeaderComponent,
    UserComponent,
    ButtonCreateComponent,
    ButtonComponent,
    ControlsComponent,
    OnHoverDirective,
    NoSpacesValidatorDirective,
    InformerComponent,
    ApiKeyInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    LockService,
    UsersService,
    ApiService,
    InformerService,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
