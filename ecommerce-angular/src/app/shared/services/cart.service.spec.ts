import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Product } from './products.service';
import { firstValueFrom } from 'rxjs';
const p1: Product = { id: 1, title: 'T-Shirt', price: 20 } as Product;

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('increases count when adding to cart', async () => {
  service.addToCart(p1, 1, 'Black', 'M');
  const count = await firstValueFrom(service.cartCount$);
  expect(count).toBe(1);
});

it('merges quantity for same product+color+size', async () => {
  service.addToCart(p1, 1, 'Black', 'M');
  service.addToCart(p1, 2, 'Black', 'M'); 

  const items = await firstValueFrom(service.cartItems$);
  const count = await firstValueFrom(service.cartCount$);

  expect(items.length).toBe(1);
  expect(items[0].quantity).toBe(3);
  expect(count).toBe(3);
});

// TDD: this should FAIL first
it('does NOT add when quantity <= 0', async () => {
  service.addToCart(p1, 0, 'Black', 'M');
  service.addToCart(p1, -3, 'Black', 'M');

  const items = await firstValueFrom(service.cartItems$);
  const count = await firstValueFrom(service.cartCount$);

  expect(items.length).toBe(0);
  expect(count).toBe(0);
});

});
