import { Component } from '@angular/core';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { CommonModule } from '@angular/common'; 
import { Product, ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-trending-products',
  imports: [ProductCardComponent,CommonModule],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.scss'
})
export class TrendingProductsComponent {
  products: Product[] = [];
constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
 const filtered = data.filter(product => product.category.includes('clothing'));
      //take the first 8 of the filtered list
this.products=filtered.slice(0, 8).map(product => ({ //map will create the returned products as array
      ...product,  //...product copies all the existing properties of the product,used to move on each product in the array to change in it
      description: product.description.split(' ').slice(0, 10).join(' ')
    }));
   });
  }
}
