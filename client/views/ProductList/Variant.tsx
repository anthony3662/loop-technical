import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ProductVariant } from '../../models/product';

type VariantProps = ProductVariant & { initialState?: boolean };
export const Variant: React.FC<VariantProps> = ({ title, inventory_quantity, price, initialState = false }) => {
  const [isOpen, setIsOpen] = useState(initialState);
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
        </>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#C7F8F5',
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
