import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, ButtonComponent,RouterModule,CurrencyPipe, TitleCasePipe, SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() title!: string;
  @Input() desc!: string;
  @Input() image!: string;
  @Input() price!: number;
  @Input() productId!:number;
}
