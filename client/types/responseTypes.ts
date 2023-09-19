import { Product } from '../models/product';
import { Order } from '../models/order';

export type ProductsResponse = {
  products: Product[];
  pageInfoParams: {
    next: string | null;
    previous: string | null;
  };
};

export type OrdersResponse = Order[];
