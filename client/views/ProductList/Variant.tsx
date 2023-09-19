import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProductVariant } from '../../models/product';
import { TotalEntry } from '../../utils/getOrderTotals';

type VariantProps = ProductVariant & { initialState?: boolean; variantTable: TotalEntry };
export const Variant: React.FC<VariantProps> = ({ id, title, inventory_quantity, price, initialState = false, variantTable }) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const { orders = 0, quantity = 0, priceTotal = 0 } = variantTable[id] || {};

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => setIsOpen(v => !v)}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {isOpen ? <AntDesign name='caretup' size={24} color='black' /> : <AntDesign name='caretdown' size={24} color='black' />}
      </View>
      {isOpen ? (
        <>
          <View style={{ height: 8 }} />
          <Text>Price: {price}</Text>
          <Text>Inventory: {inventory_quantity}</Text>
          <View style={{ height: 8 }} />
          <Text>Orders Placed: {orders}</Text>
          <Text>Quantity Ordered: {quantity}</Text>
          <Text>Value of Orders: ${priceTotal}</Text>
        </>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#C7EDF8',
    borderRadius: 4,
    marginVertical: 4,
    padding: 8,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
});
