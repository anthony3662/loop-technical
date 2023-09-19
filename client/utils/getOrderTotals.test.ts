import { Order } from '../models/order';
import { getOrderTotals } from './getOrderTotals';

describe('getOrderTotals', () => {
  it('should output correct totals for a single line item', () => {
    const testOrder: Order[] = [
      {
        line_items: [{ price: '13.00', product_id: 900, variant_id: 700, quantity: 2 }],
      },
    ];
    const output = getOrderTotals(testOrder);
    expect(output).toEqual({
      productTable: {
        900: {
          quantity: 2,
          orders: 1,
          priceTotal: 13,
        },
      },
      variantTable: {
        700: {
          quantity: 2,
          orders: 1,
          priceTotal: 13,
        },
      },
    });
  });

  it('should correctly combine totals', () => {
    const testOrder: Order[] = [
      {
        line_items: [
          { price: '13.00', product_id: 900, variant_id: 700, quantity: 2 },
          {
            price: '13.00',
            product_id: 900,
            variant_id: 701,
            quantity: 2,
          },
        ],
      },
      {
        line_items: [
          { price: '10.00', product_id: 900, variant_id: 701, quantity: 3 },
          {
            product_id: 901,
            price: '29.00',
            variant_id: 705,
            quantity: 3,
          },
        ],
      },
    ];
    const output = getOrderTotals(testOrder);
    expect(output).toEqual({
      productTable: {
        900: {
          quantity: 7,
          orders: 3,
          priceTotal: 36,
        },
        901: {
          quantity: 3,
          orders: 1,
          priceTotal: 29,
        },
      },
      variantTable: {
        700: {
          quantity: 2,
          orders: 1,
          priceTotal: 13,
        },
        701: {
          quantity: 5,
          orders: 2,
          priceTotal: 23,
        },
        705: {
          quantity: 3,
          orders: 1,
          priceTotal: 29,
        },
      },
    });
  });
});
