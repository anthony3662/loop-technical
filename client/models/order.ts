export type Order = {
  line_items: {
    price: string;
    product_id: string;
    variant_id: string;
    quantity: number;
  }[];
};
