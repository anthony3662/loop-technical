export type Order = {
  line_items: {
    price: string;
    product_id: number;
    variant_id: number;
    quantity: number;
  }[];
};
