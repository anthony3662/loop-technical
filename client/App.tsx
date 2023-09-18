import { SafeAreaView, StyleSheet } from 'react-native';
import { ProductList } from './views/ProductList/ProductList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ProductList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
});
