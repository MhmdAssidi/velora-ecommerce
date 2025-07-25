import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
product!:Product
ngOnInit(): void {
    
}

}
