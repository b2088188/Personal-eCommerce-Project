import React, {useReducer} from 'react';
import {CartProvider} from './cartContext';
import cartReducer from './cartReducer';
import axios from 'axios';
import {
ADD_CARTITEM,
REMOVE_CARTITEM,
CHANGE_QUANTITY,
CALCULATE_QTYANDPRICE
} from '../types';

const InitialState = {
  cartList: [],
  loading: null,
  error: null
}

const CartStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(cartReducer, InitialState);

  function addCartList(item, quantity) {
  	console.log(item, quantity);
  }

	let value = {
    addCartList
	}

	return (
      <CartProvider value = {value}>
      	{children}
      </CartProvider>
		)
}

export default CartStore;