import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/auth/authentication.service';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
 signInForm!: FormGroup;  //signinForm is the form.
apiErrorMessage = '';

  constructor(private fb: FormBuilder,private router: Router, private authService: AuthenticationService) {}

ngOnInit(): void {
  this.signInForm = this.fb.group({ 
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  },{
  });
}

onSubmit() {
  if (this.signInForm.invalid) {
    this.signInForm.markAllAsTouched();
    return;
  }

  const credentials = {
    Username: this.signInForm.value.email,
    password: this.signInForm.value.password
  };

  this.authService.login(credentials).subscribe({
    next: (response) => {
      this.apiErrorMessage = '';
      this.router.navigate(['/']); // navigate wherever you want after login
    },
    error: (error) => {
      this.apiErrorMessage = 'Invalid username or password';

    }
  });
}


goToForgotPass(){
  this.router.navigate(['/forgot-password']);
}
}
