import { View, Text, Image, StyleSheet } from 'react-native';
import {Product} from "../models/product";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { title, variants } = product;
  const firstVariant = variants[0];

  return (
    <View style={styles.card}>
      {product.image && <Image source={{ uri: product.image.src }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Price: {firstVariant.price}</Text>
      <Text style={styles.inventory}>Inventory: {firstVariant.inventory_quantity}</Text>
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
  },
  image: {
    width: 100,
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

