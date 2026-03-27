import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

import { CartItem } from './shared/models/cart-item.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
private items:CartItem[]=this.loadCart();
  constructor() { }

  //load the cart from session storage when the service is created, and save it back whenever it changes. This way, the cart persists across page reloads but is cleared when the browser session ends.
private loadCart(): CartItem[] {
  const data = sessionStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}
private saveCart(): void {
  sessionStorage.setItem('cart', JSON.stringify(this.items));
}
  //BehaviorSubject to keep track of data
private cartItemSubject=new BehaviorSubject<CartItem[]>([]);
private cartCountSubject=new BehaviorSubject<number>(0);

//these allow other components like header to subscribe to live changes
cartItems$=this.cartItemSubject.asObservable(); //for showing all cart items
cartCount$=this.cartCountSubject.asObservable(); //for showing number on cart icon

addToCart(product:Product,quantity:number,color:string,size:string):void{
  if (quantity <= 0) return;
  const existingItem=this.items.find(item=>item.product.id===product.id && item.color===color && item.size===size); //find the product that will click on it if its in the items array
  if(existingItem){ //if the product exist add the quantity
    existingItem.quantity+=quantity;
  }
  else{ //add it to the items array
    this.items.push({product,quantity,color,size});
  }
  this.updateCart();
}

removeFromCart(productId:number):void{
  this.items=this.items.filter(item=>item.product.id!==productId);
this.updateCart();
}
getItems():CartItem[]{
  return this.items;
}

private updateCart():void{
  this.saveCart();//save in session storage
  this.cartItemSubject.next([...this.items]); ////keep track of changes in products in all components
  const totalCount=this.items.reduce((sum,item)=>sum+item.quantity,0);
  this.cartCountSubject.next(totalCount); //keep track of changes in count in all components
}
}
