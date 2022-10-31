import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appNoSpaces]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoSpacesValidatorDirective,
      multi: true,
    },
  ],
})
export class NoSpacesValidatorDirective {

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value.trim().length === 0 ? { required: true } : null;
  }
  
}
