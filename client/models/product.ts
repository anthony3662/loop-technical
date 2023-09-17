export type Product = {
  title: string;
  image: null | { src: string };
  variants: {
    title: string;
    inventory_quantity: number;
    price: string;
  }[];
};
