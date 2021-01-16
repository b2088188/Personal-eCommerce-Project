import React, { useReducer, useCallback, useMemo } from 'react';
import { ProductProvider } from './productContext';
import { ProductsProvider } from './productsContext';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';

const ProductStore = ({ children }) => {
   const [stateProducts, fetchProducts] = useFetch({
      data: []
   });
   const [stateProduct, fetchProduct] = useFetch({
      data: {}
   });

   const getAllProducts = useCallback(
      async function () {
         fetchProducts(axios.get('/api/v1/products'));
      },
      [fetchProducts]
   );

   const getProduct = useCallback(
      async function (id) {
         fetchProduct(axios.get(`/api/v1/products/${id}`));
      },
      [fetchProduct]
   );

   let valueProducts = useMemo(
      () => ({
         products: stateProducts.data.products,
         statusProducts: stateProducts.status,
         errorProducts: stateProducts.error,
         getAllProducts
      }),
      [stateProducts, getAllProducts]
   );

   let valueProduct = useMemo(
      () => ({
         product: stateProduct.data.product,
         statusProduct: stateProduct.status,
         errorProduct: stateProduct.error,
         getProduct
      }),
      [stateProduct, getProduct]
   );

   return (
      <ProductsProvider value={valueProducts}>
         <ProductProvider value={valueProduct}>{children}</ProductProvider>
      </ProductsProvider>
   );
};

export default ProductStore;
