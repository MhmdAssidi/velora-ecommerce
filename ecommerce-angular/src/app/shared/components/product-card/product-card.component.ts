import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, SlicePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, RouterModule,CurrencyPipe, TitleCasePipe, SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  constructor(private cartService: CartService) {}

  @Input() title!: string;
  @Input() desc!: string;
  @Input() image!: string;
  @Input() price!: number;
  @Input() productId!:number;

  addToCart(): void {
    const product: Product = {
      id: this.productId,
      title: this.title,
      price: this.price,
      description: this.desc,
      category: '',
      image: this.image
    };

    this.cartService.addToCart(product, 1, '#000', 'M');
  }
}
