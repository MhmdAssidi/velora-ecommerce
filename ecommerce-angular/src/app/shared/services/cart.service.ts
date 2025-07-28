import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

export interface CartItem{
  product:Product;
  quantity:number,
  color:string,
  size:string

}
@Injectable({
  providedIn: 'root'
})
export class CartService {
private items:CartItem[]=[];
  constructor() { }

  //BehaviorSubject to keep track of data
private cartItemSubject=new BehaviorSubject<CartItem[]>([]);
private cartCountSubject=new BehaviorSubject<number>(0);

//these allow other components like header to subscribe to live changes
cartItems$=this.cartItemSubject.asObservable(); //for showing all cart items
cartCount$=this.cartCountSubject.asObservable(); //for showing number on cart icon

addToCart(product:Product,quantity:number,color:string,size:string):void{
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
  this.cartItemSubject.next([...this.items]); ////keep track of changes in products in all components
  const totalCount=this.items.reduce((sum,item)=>sum+item.quantity,0);
  this.cartCountSubject.next(totalCount); //keep track of changes in count in all components
}
}
