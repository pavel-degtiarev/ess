import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface IValidationResult {
  isOk: boolean;
  message: string;
}

@Injectable()
export class ValidateService {

  validate(form: FormGroup): IValidationResult {
    
    if (form.status === 'VALID') return { isOk: true, message: '' };

    const messages = new Set();

    Object.keys(form.controls).forEach((field) => {
      if (form.controls[field].status === 'VALID') return;

      const errors = Object.keys(form.controls[field].errors!);
      errors.includes('required') && messages.add('All fields are mandatory.');
      errors.includes('email') && messages.add('Entered email is incorrect.');
      errors.includes('min') && messages.add('Age can not be negative.');
    });

    return { isOk: false, message: [...messages].join("\n") };
  }
}
