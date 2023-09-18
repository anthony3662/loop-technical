import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../../models/product';
import { Variant } from './Variant';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { title, variants } = product;

  return (
    <View style={styles.card}>
      {product.image && <Image source={{ uri: product.image.src }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <View style={{ height: 16 }} />
      {variants.map((variant, i) => (
        // first variant is opened by default
        <Variant {...variant} initialState={i === 0} key={i.toString()} />
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
