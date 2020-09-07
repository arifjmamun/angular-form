import { AppService } from '../services/app.service';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class EmailValidator {
  static isExist(appService: AppService): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return appService.checkEmailExist(control.value).pipe(
        map((isExist) => {
          return isExist ? { exists: true } : null;
        })
      );
    };
  }
}
