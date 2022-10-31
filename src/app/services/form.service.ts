import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user.interface';
import { ValidateService } from './validate.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  form: FormGroup;

  constructor(private validationService: ValidateService) {}

  // убираем хвостовые пробелы, если есть
  get clearedFields() {
    return {
      ...this.form.value,
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      email: this.form.value.email.trim(),
    };
  }

  createForm(user: IUser) {
    const { firstName, lastName, age, email, gender } = user;
    
    this.form = new FormGroup({
      firstName: new FormControl<string>(firstName, Validators.required),
      lastName: new FormControl<string>(lastName, Validators.required),
      email: new FormControl<string>(email, [ Validators.required, Validators.email ]),
      age: new FormControl<number>(age, [ Validators.required, Validators.min(0) ]),
      gender: new FormControl<string>(gender),
    });

    return this.form;
  }

  validate() {
    return this.validationService.validate(this.form);
  }
}
