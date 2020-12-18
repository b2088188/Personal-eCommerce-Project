import React, {useReducer} from 'react';
import {ProductProvider} from './productContext';
import productReducer from './productReducer';
import axios from 'axios';
import {
LOADING_PRODUCTS,
PRODUCTS_SUCCESS,
PRODUCTS_FAIL
} from '../types';

let InitialState = {
   products: [],
   loading: null,
   error: null
}

const ProductStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(productReducer, InitialState);

  async function getAllProducts() {
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
  }

let value = {
   products: state.products,
   loading: state.loading,
   error: state.error,
   getAllProducts
}

	return (
      <ProductProvider value = {value}>
      	{children}
      </ProductProvider>
		)
}

export default ProductStore;