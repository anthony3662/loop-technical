import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../../models/product';
import { Variant } from './Variant';
import { getOrderTotals } from '../../utils/getOrderTotals';

export const ProductCard: React.FC<{ product: Product; orderTotals: ReturnType<typeof getOrderTotals> }> = ({ product, orderTotals }) => {
  const { title, variants, id } = product;

  const { productTable, variantTable } = orderTotals;
  return (
    <View style={styles.card}>
      {product.image && <Image source={{ uri: product.image.src }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text>Orders Placed: {productTable[id]?.orders || 0}</Text>
      <Text>Quantity Ordered: {productTable[id]?.quantity || 0}</Text>
      <Text>Value of Orders: ${productTable[id]?.priceTotal || 0}</Text>
      <View style={{ height: 16 }} />
      {variants.map((variant, i) => (
        // first variant is expanded by default
        <Variant variantTable={variantTable} {...variant} initialState={i === 0} key={i.toString()} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginTop: 4,
  },
  inventory: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
});
