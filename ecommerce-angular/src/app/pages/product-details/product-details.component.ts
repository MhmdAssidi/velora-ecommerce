import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../layout/header/header.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { FindFashionSectionComponent } from "../../shared/components/find-fashion-section/find-fashion-section.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { CartService } from '../../shared/services/cart.service';
@Component({
  selector: 'app-product-details',
  imports: [CommonModule, HeaderComponent, ButtonComponent, FooterComponent, FindFashionSectionComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    constructor(private productService: ProductsService, private route:ActivatedRoute,private authService:AuthenticationService,private router:Router,private cartService:CartService) {}
  
selectedSize:string=''
sizes=['XXS','XS','S','L','XL','XXL'];

colors = ['#dceeff', '#8cc63f', '#000'];
selectedColor:string='';

quantity = 1;

increaseQuantity(): void {
  this.quantity++;
}

decreaseQuantity(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
singleProduct!: Product;

ngOnInit(): void {
  const productId=Number(this.route.snapshot.paramMap.get('productId'));
  // console.log(productId);
  if(productId){
  this.productService.getSingleProduct(productId).subscribe(data => {
    this.singleProduct =data;
    // console.log(this.singleProduct)
  })
}
}

handleAddToCart():void {
  // if (!this.authService.isLoggedIn()){
  //   this.router.navigate(['/signup']);
  //   return;
  // }

if(!this.singleProduct || !this.selectedColor || !this.selectedSize){
  alert('select size and color');
  return;
}
this.cartService.addToCart(this.singleProduct,this.quantity,this.selectedColor,this.selectedSize);
alert('added to cart');
console.log(this.singleProduct);
console.log(this.quantity);
console.log(this.selectedColor);
console.log(this.selectedSize);

}
}