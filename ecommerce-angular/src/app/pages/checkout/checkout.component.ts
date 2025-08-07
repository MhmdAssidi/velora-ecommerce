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
import { CartItem, CartService } from '../../shared/services/cart.service';
@Component({
  selector: 'app-checkout',
  imports: [HeaderComponent, ButtonComponent, MatInputModule, ReactiveFormsModule, FooterComponent,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthenticationService,private cartService:CartService) {}
cartItems: CartItem[] = [];

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
    this.cartItems = this.cartService.getItems(); 

}
getTotalCost():number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  checkoutComplete = false;

onSubmit() {
  if (this.checkoutForm.invalid) {
    this.checkoutForm.markAllAsTouched();
    return;
  }
const checkoutData = {
  ...this.checkoutForm.value,
  items: this.cartItems,
  total: this.getTotalCost() + 40,
  date: new Date().toLocaleString()
};
localStorage.setItem('checkoutInfo',JSON.stringify(checkoutData));
this.checkoutComplete=true;
}
}
