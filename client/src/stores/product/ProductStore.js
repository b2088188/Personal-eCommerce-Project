import React, { useCallback, useMemo } from 'react';
import { ProductProvider } from './productContext';
import { ProductsProvider } from './productsContext';
import productsReducer from './productsReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../types';

const ProductStore = ({ children }) => {
   const [stateProducts, fetchProducts, dispatchProducts] = useFetch(
      {
         products: []
      },
      productsReducer
   );
   const [stateProduct, fetchProduct] = useFetch({
      data: {}
   });

   const getSortedProducts = useCallback(
      async function (q, sort) {
         let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`;
         if (q) url = `${url}/?q=${q}`;
         if (sort) url = `${url}&sort=${sort}`;
         const { status } = await fetchProducts(axios.get(url));
         if (status === 'success') dispatchProducts({ type: GET_PRODUCTS });
      },
      [fetchProducts, dispatchProducts]
   );

   const getFilteredProducts = useCallback(
      async function (category) {
         let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`;
         if (category) url = `${url}/?category=${category}`;
         const { status } = await fetchProducts(axios.get(url));
         if (status === 'success') dispatchProducts({ type: GET_PRODUCTS });
      },
      [fetchProducts, dispatchProducts]
   );

   const getProduct = useCallback(
      async function (id) {
         fetchProduct(axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${id}`));
      },
      [fetchProduct]
   );

   const createProduct = useCallback(
      async function (values) {
         const formData = new FormData();
         const fields = Object.keys(values);
         fields.forEach((el) => {
            if (el === 'image' && values[el].length > 0) {
               formData.append('image', values[el][0]);
            }
            if (el !== 'image') formData.append(el, values[el]);
         });
         const { status } = await fetchProducts(
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products`, formData)
         );
         if (status === 'success') dispatchProducts({ type: CREATE_PRODUCT });
      },
      [fetchProducts, dispatchProducts]
   );

   const updateProduct = useCallback(
      async function (productId, values) {
         const formData = new FormData();
         const fields = Object.keys(values);
         fields.forEach((el) => {
            if (el === 'image' && values[el].length > 0) {
               formData.append('image', values[el][0]);
            }
            if (el !== 'image') formData.append(el, values[el]);
         });
         const { status } = await fetchProducts(
            axios.patch(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}`,
               formData
            )
         );
         if (status === 'success') dispatchProducts({ type: UPDATE_PRODUCT });
      },
      [fetchProducts, dispatchProducts]
   );

   const deleteProduct = useCallback(
      async function (productId) {
         await fetchProducts(
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}`)
         );
         dispatchProducts({ type: DELETE_PRODUCT, payload: { productId } });
      },
      [fetchProducts, dispatchProducts]
   );

   let valueProducts = useMemo(
      () => ({
         products: stateProducts.products,
         statusProducts: stateProducts.status,
         errorProducts: stateProducts.error,
         getSortedProducts,
         getFilteredProducts,
         createProduct,
         updateProduct,
         deleteProduct
      }),
      [
         stateProducts,
         getSortedProducts,
         getFilteredProducts,
         createProduct,
         updateProduct,
         deleteProduct
      ]
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
