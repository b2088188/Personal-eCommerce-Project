import * as R from 'ramda';
import React, {useReducer} from 'react';
import {CartProvider} from './cartContext';
import cartReducer from './cartReducer';
import axios from 'axios';
import {
LOADING_CARTLIST,
CARTLIST_SUCCESS,
ADD_CARTITEM,
REMOVE_CARTITEM,
CHANGE_QUANTITY,
CALCULATE_QTYANDPRICE
} from '../types';

const InitialState = {
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
  loading: null,
  error: null,
  totalPrice: 0,
  totalQuantity: 0
}

const CartStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(cartReducer, InitialState);
  console.log(state.cartList)
 function addToCartList(item, quantity) {
  	dispatch({
  		type: ADD_CARTITEM,
  		payload: {
  			item: {
  				...R.pick(['_id', 'name', 'image', 'price', 'countInStock'], item),
  				...{quantity}
  			}
  		}
  	})
   calcTotal();
  	//localStorage.setItem('cartList', JSON.stringify(state.cartList))
  }

  function deleteFromCart(id) {
  	return function () {  		
  	dispatch({
  		type: REMOVE_CARTITEM,
  		payload: {
  			id
  		}
  	})
  	}
  }

  function changeItemQuantity(id, quantity) {
     dispatch({
      type: CHANGE_QUANTITY,
      payload: {
        id,
        quantity
      }
     })
     calcTotal();
  }

  function calcTotal() {
     dispatch({
      type: CALCULATE_QTYANDPRICE     
    })
  }

  function getCartList() {
  	// dispatch({
  	// 	type: LOADING_CARTLIST
  	// })
  	// const cartList =  || [];
  	// dispatch({
  	// 	type: CARTLIST_SUCCESS,
  	// 	payload: {
  	// 		cartList
  	// 	}
  	// })
  	// dispatch({
  	// 	type: CALCULATE_QTYANDPRICE  		
  	// })
  }

	let value = {
		cartList: state.cartList,
		loading: state.loading,
		error: state.error,
		totalPrice: state.totalPrice,
		totalQuantity: state.totalQuantity,
		getCartList,
    addToCartList,
    changeItemQuantity,
    deleteFromCart
	}

	return (
      <CartProvider value = {value}>
      	{children}
      </CartProvider>
		)
}

export default CartStore;