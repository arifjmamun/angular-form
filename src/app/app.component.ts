import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmailValidator } from './validators/email.validator';
import { AppService } from './services/app.service';
import { Status } from './models/response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public signupForm: FormGroup;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
        EmailValidator.isExist(this.appService),
      ],
      password: ['', Validators.required],
    });
  }

  public get firstName(): AbstractControl {
    return this.signupForm.get('firstName');
  }

  public get lastName(): AbstractControl {
    return this.signupForm.get('lastName');
  }

  public get email(): AbstractControl {
    return this.signupForm.get('email');
  }

  public get isInvalidEmail(): boolean {
    return (
      this.email.touched &&
      !this.email.hasError('required') &&
      this.email.hasError('email')
    );
  }

  public get isEmailExists(): boolean {
    return (
      this.email.touched &&
      !this.email.hasError('required') &&
      this.email.hasError('exists')
    );
  }

  public get password(): AbstractControl {
    return this.signupForm.get('password');
  }

  public signup(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.appService.signup(this.signupForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          if (response && response.data.status === Status.ACTIVE) {
            this.snackBar.open(response.message, null, {
              duration: 2000,
            });
          }
        },
        (error) => {
          this.isLoading = false;
          if (error.error.errors && error.error.errors.length) {
            const errorMessage = error.error.errors[0].message;
            this.snackBar.open(errorMessage, null, {
              duration: 5000,
              panelClass: 'error-panel',
            });
          }
        }
      );
    }
  }
}
