import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import { useEffect } from 'react';
import { useRequest } from '../utils/useRequest';
import {ProductsResponse} from "../types/responseTypes";
import {ProductCard} from "./ProductCard";

export const ProductList: React.FC = () => {
  const { get, data } = useRequest<ProductsResponse>();

  useEffect(() => {
    get('https://loop-take-home.loca.lt/products').then(r => console.log(JSON.stringify(r)));
  }, []);

  if (!data) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <Text>Product List</Text>
      <FlatList
        data={data.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};
