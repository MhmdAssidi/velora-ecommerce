import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/auth/authentication.service';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-signup',
 imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent
],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;  //signupForm is the form.

  constructor(private fb: FormBuilder,private router: Router, private authService: AuthenticationService) {}

ngOnInit(): void {
  this.signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  },{
        validators: passwordMatchValidator()

  });
}

onSubmit() {
  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }

 const signupData = {
  Firstname: this.signupForm.value.firstName,
  Lastname: this.signupForm.value.lastName,
  Email: this.signupForm.value.email,
  Password: this.signupForm.value.password,
  RoleName: 'User'
};


  this.authService.signup(signupData).subscribe({
  next: (response) => {
    console.log('Signup successful!', response);
    this.router.navigate(['/signin']);
  },
  error: (error) => {
    console.error('Signup error', error);
  }
});
}

goToSignin() {
  this.router.navigate(['/signin']);
}

}
