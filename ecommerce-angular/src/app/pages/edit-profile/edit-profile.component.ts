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

@Component({
  selector: 'app-edit-profile',
  imports: [HeaderComponent, FooterComponent, ButtonComponent, MatInputModule,ReactiveFormsModule],
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
  if (this.editProfileForm.invalid) {
    this.editProfileForm.markAllAsTouched();
    return;
  }

}
}
