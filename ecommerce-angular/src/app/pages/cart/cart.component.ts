import { Component, OnInit } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from "../../layout/header/header.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { RouterModule } from '@angular/router';
import {CartService } from '../../shared/services/cart.service';
import { CartItem } from '../../shared/services/shared/models/cart-item.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [MatTableModule, CurrencyPipe, HeaderComponent, MatTooltipModule, ButtonComponent,RouterModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private cartService:CartService){}
displayedColumns: string[] = ['item', 'cost', 'quantity', 'total'];
cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems(); // fetch items from CartService
  }
 

  getTotalCost():number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  removeItem(item:CartItem){
    this.cartService.removeFromCart(item.product.id);
    this.cartItems=this.cartService.getItems(); //refresh array
  }
}
