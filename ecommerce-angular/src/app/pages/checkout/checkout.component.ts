import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout',
  imports: [HeaderComponent, ButtonComponent, MatInputModule, ReactiveFormsModule, FooterComponent,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthenticationService) {}

ngOnInit(): void {
  this.checkoutForm = this.fb.group({
    country: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    creditCard: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardHolderName: ['', Validators.required]
  });
}
onSubmit() {
  if (this.checkoutForm.invalid) {
    this.checkoutForm.markAllAsTouched();
    return;
  }

}
}
