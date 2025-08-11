import { Product } from "../../products.service";
export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}
