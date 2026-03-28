import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
@Component({
  selector: 'app-signup',
  standalone: true,
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
export class SignupComponent {
  signupForm: FormGroup;
  submitAttempted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    this.submitAttempted = true;
    
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const formValue = this.signupForm.value;

    const signupData = {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      phone_number: formValue.phone,
      password: formValue.password
    };

    console.log('Data sent to backend:', signupData);

    this.authService.signup(signupData).subscribe({
      next: (response) => {
        console.log('Signup success:', response);
        alert('Account created successfully');
        this.signupForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        alert(error.error?.message || 'Signup failed');
      }
    });
  }

  goToSignin(): void {
    this.router.navigate(['/signin']);
  }
}