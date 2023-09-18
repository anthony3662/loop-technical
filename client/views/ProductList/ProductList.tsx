import { ActivityIndicator, FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import { useRequest } from '../../utils/useRequest';
import { ProductsResponse } from '../../types/responseTypes';
import { ProductCard } from './ProductCard';

const BASE_PRODUCTS_URL = 'https://loop-take-home.loca.lt/products';
export const ProductList: React.FC = () => {
  const { get, data, isLoading } = useRequest<ProductsResponse>();

  useEffect(() => {
    // initial fetch
    get(BASE_PRODUCTS_URL);
  }, []);

  const fetchNextPage = () => {
    const nextPageInfo = data?.pageInfoParams.next;
    if (!nextPageInfo || isLoading) {
      return;
    }
    get(`${BASE_PRODUCTS_URL}?page_info=${nextPageInfo}`);
  };

  const fetchPreviousPage = () => {
    const lastPageInfo = data?.pageInfoParams.previous;
    if (!lastPageInfo || isLoading) {
      return;
    }
    get(`${BASE_PRODUCTS_URL}?page_info=${lastPageInfo}`);
  };

  const renderData = () => {
    if (!data || isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <FlatList
        data={data.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    );
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Universe of Birds</Text>
      {renderData()}
      <View style={styles.pageTurner}>
        {data?.pageInfoParams.previous ? <Button disabled={isLoading} onPress={fetchPreviousPage} title={'Previous Page'} /> : <View />}
        {data?.pageInfoParams.next ? <Button disabled={isLoading} onPress={fetchNextPage} title={'Next Page'} /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  header: {
    fontSize: 24,
    alignSelf: 'center',
    margin: 16,
    fontWeight: '700',
  },
  pageTurner: {
    width: '100%',
    backgroundColor: '#eeeeee',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
  },
});
