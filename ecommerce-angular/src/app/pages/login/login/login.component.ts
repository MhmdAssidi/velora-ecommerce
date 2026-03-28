import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent,RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
 signInForm!: FormGroup;  //signinForm is the form.
apiErrorMessage = '';
submitAttempted = false;
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthenticationService) {}

ngOnInit(): void {
  this.signInForm = this.fb.group({ 
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  },{
  });
}

onSubmit(): void {
    this.submitAttempted = true;
    
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const formValue = this.signInForm.value;

    const signInData = {
      email: formValue.email,
      phone_number: formValue.phone,
      password: formValue.password
    };

    console.log('Data sent to backend:', signInData);

    this.authService.signin(signInData).subscribe({
      next: (response) => {
        console.log('Signup success:', response);
        this.signInForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Signin failed:', error);
        alert(error.error?.message || 'Signin failed');
      }
    });
  }


goToForgotPass(){
  this.router.navigate(['/forgot-password']);
}
}
