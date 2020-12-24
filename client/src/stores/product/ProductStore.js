import React, {useReducer, useCallback} from 'react';
import {ProductProvider} from './productContext';
import productReducer from './productReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import {
LOADING_PRODUCTS,
PRODUCTS_SUCCESS,
PRODUCTS_FAIL,
LOADING_PRODUCT,
PRODUCT_SUCCESS,
PRODUCT_FAIL
} from '../types';

let InitialState = {
   products: [],
   product: null,
   loading: null,
   error: null
}

const ProductStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(productReducer, InitialState);

const getAllProducts = useCallback(async function () {
     try {
    dispatch({type: LOADING_PRODUCTS});
     const {data: {data}} = await axios.get('/api/v1/products');         
     dispatch({
        type: PRODUCTS_SUCCESS,
        payload: {
           products: data.products
        }
     })
     }
     catch({response: {data}}) {
        dispatch({
           type: PRODUCTS_FAIL,
           payload: {
              error: data.message
           }
        })    
     }           
  }, [])

  const getProduct = useCallback(async function (id) {
       try {
          dispatch({type: LOADING_PRODUCT})
          const {data: {data}} = await axios.get(`/api/v1/products/${id}`);
          dispatch({
           type: PRODUCT_SUCCESS,
           payload: {
              product: data.product
           }
          })
       }
       catch({response: {data}}) {
              dispatch({
                 type: PRODUCT_FAIL,
                 payload: {
                    error: data.message
                 }
              })
       }           
    }, [])

let value = {
   products: state.products,
   product: state.product,
   loading: state.loading,
   error: state.error,
   getAllProducts,
   getProduct
}

	return (
      <ProductProvider value = {value}>
      	{children}
      </ProductProvider>
		)
}

export default ProductStore;