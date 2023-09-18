import { Product } from '../models/product';

export type ProductsResponse = {
  products: Product[];
  pageInfoParams: {
    next: string | null;
    previous: string | null;
  };
};
