import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category:string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private apiUrl = 'https://fakestoreapi.com/products';
private apiUrlSingleProd = 'https://fakestoreapi.com/products/1';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

 getSingleProduct(productId: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${productId}`);
}

}
