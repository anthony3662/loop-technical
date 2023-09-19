import { Order } from '../models/order';

export type TotalEntry = { [id: string]: { quantity: number; orders: number; priceTotal: number } };
export const getOrderTotals = (orders: Order[]) => {
  // multiple variants of a product in one order will be counted as distinct orders.
  const productTable: TotalEntry = {};
  const variantTable: TotalEntry = {};

  orders.forEach(order => {
    order.line_items.forEach(item => {
      if (!productTable[item.product_id]) {
        productTable[item.product_id] = {
          quantity: 0,
          orders: 0,
          priceTotal: 0,
        };
      }

      if (!variantTable[item.variant_id]) {
        variantTable[item.variant_id] = {
          quantity: 0,
          orders: 0,
          priceTotal: 0,
        };
      }

      const entryToModify = productTable[item.product_id];
      const variantEntryToModify = variantTable[item.variant_id];

      entryToModify.quantity += item.quantity;
      variantEntryToModify.quantity += item.quantity;

      entryToModify.orders += 1;
      variantEntryToModify.orders += 1;

      const parsedPrice = Number(item.price);
      if (!isNaN(parsedPrice)) {
        entryToModify.priceTotal += parsedPrice;
        variantEntryToModify.priceTotal += parsedPrice;
      }
    });
  });

  return {
    productTable,
    variantTable,
  };
};
