export type ProductVariant = {
  id: number;
  title: string;
  inventory_quantity: number;
  price: string;
};

export type Product = {
  id: number;
  title: string;
  image: null | { src: string };
  variants: ProductVariant[];
};
