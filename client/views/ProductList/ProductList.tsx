import { ActivityIndicator, FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { useEffect, useMemo } from 'react';
import { useRequest } from '../../utils/useRequest';
import { OrdersResponse, ProductsResponse } from '../../types/responseTypes';
import { ProductCard } from './ProductCard';
import { getOrderTotals } from '../../utils/getOrderTotals';

const BASE_PRODUCTS_URL = 'https://loop-take-home.loca.lt/products';
const BASE_ORDERS_URL = 'https://loop-take-home.loca.lt/orders';
export const ProductList: React.FC = () => {
  const { get: getProducts, data: productsData, isLoading: isProductsLoading } = useRequest<ProductsResponse>();
  const { get: getOrders, data: ordersData, isLoading: isOrdersLoading } = useRequest<OrdersResponse>();
  const isLoading = isProductsLoading || isOrdersLoading;

  useEffect(() => {
    // initial fetch
    getProducts(BASE_PRODUCTS_URL);
    getOrders(BASE_ORDERS_URL);
  }, []);

  const orderTotals = useMemo(() => {
    if (!ordersData) {
      return;
    }
    return getOrderTotals(ordersData);
  }, [ordersData]);

  const fetchNextPage = () => {
    const nextPageInfo = productsData?.pageInfoParams.next;
    if (!nextPageInfo || isLoading) {
      return;
    }
    getProducts(`${BASE_PRODUCTS_URL}?page_info=${nextPageInfo}`);
  };

  const fetchPreviousPage = () => {
    const lastPageInfo = productsData?.pageInfoParams.previous;
    if (!lastPageInfo || isLoading) {
      return;
    }
    getProducts(`${BASE_PRODUCTS_URL}?page_info=${lastPageInfo}`);
  };

  const renderData = () => {
    if (!productsData || !orderTotals || isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <FlatList
        data={productsData.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProductCard product={item} orderTotals={orderTotals} />}
      />
    );
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Universe of Birds</Text>
      {renderData()}
      <View style={styles.pageTurner}>
        {productsData?.pageInfoParams?.previous ? (
          <Button disabled={isLoading} onPress={fetchPreviousPage} title={'Previous Page'} />
        ) : (
          <View />
        )}
        {productsData?.pageInfoParams?.next ? <Button disabled={isLoading} onPress={fetchNextPage} title={'Next Page'} /> : null}
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
