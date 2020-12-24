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
CALCULATE_QTYANDPRICE,
SAVE_PAYINFO
} from '../types';

const InitialState = {
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  totalQuantity: 0,
  shippingAddress: null,
  paymentMethod: null,
  loading: null,
  error: null
}

const CartStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(cartReducer, InitialState);
 function addToCartList(item, quantity) {
  	dispatch({
  		type: ADD_CARTITEM,
  		payload: {
  			item: {
          ['product']: R.prop('_id', item),
  				...R.pick(['name', 'image', 'price', 'countInStock'], item),
  				...{quantity}
  			}
  		}
  	})
   calcPriceAndQty();
  	
  }

  function deleteFromCart(id) {
  	return function () {  		
  	dispatch({
  		type: REMOVE_CARTITEM,
  		payload: {
  			id
  		}
  	})
    calcPriceAndQty();
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
     calcPriceAndQty();
  }

  function calcPriceAndQty() {
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

  function savePayInfo(name, values) {
    dispatch({
      type: SAVE_PAYINFO,
      payload: {
        name,
        data: values
      }
    })
  }

	let value = {
		cartList: state.cartList,
		loading: state.loading,
		error: state.error,    
    itemsPrice: state.itemsPrice,
    shippingPrice: state.shippingPrice,
		totalPrice: state.totalPrice,
		totalQuantity: state.totalQuantity,
    shippingAddress: state.shippingAddress,
    paymentMethod: state.paymentMethod,
		getCartList,
    addToCartList,
    changeItemQuantity,
    deleteFromCart,
    savePayInfo
	}

	return (
      <CartProvider value = {value}>
      	{children}
      </CartProvider>
		)
}

export default CartStore;