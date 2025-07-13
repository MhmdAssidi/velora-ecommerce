import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent  implements OnInit {
 forgotPasswordForm!: FormGroup;  //signinForm is the form.

  constructor(private fb: FormBuilder,private router: Router) {}

ngOnInit(): void {
  this.forgotPasswordForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],

  });
}

onSubmit(): void {
  if (this.forgotPasswordForm.invalid) {
    this.forgotPasswordForm.markAllAsTouched();
    return;
  }

  console.log(this.forgotPasswordForm.value);
}
goToSignin() {
  this.router.navigate(['/signin']);
}
}
