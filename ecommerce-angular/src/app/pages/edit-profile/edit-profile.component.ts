import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { CartService } from '../../shared/services/cart.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-profile',
  imports: [HeaderComponent, FooterComponent, ButtonComponent, MatInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
this.editProfileForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
  lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
  email: ['', [Validators.required, Validators.email]],
  address: ['', Validators.required],
  contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
  city: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});

  }
  onSubmit() {
  if (this.editProfileForm.invalid) {
    this.editProfileForm.markAllAsTouched();
    return;
  }

}
}
