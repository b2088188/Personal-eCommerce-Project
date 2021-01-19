import * as R from 'ramda';
import React, { useReducer, useMemo, useCallback } from 'react';
import { CartStateProvider, CartActionProvider } from './cartContext';
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
};

export function addToCartList(dispatch, item, quantity) {
   dispatch({
      type: ADD_CARTITEM,
      payload: {
         item: {
            ['product']: R.prop('_id', item),
            ...R.pick(['name', 'image', 'price', 'countInStock'], item),
            ...{ quantity }
         }
      }
   });
   dispatch({
      type: CALCULATE_QTYANDPRICE
   });
}

export function deleteFromCartList(dispatch, id) {
   dispatch({
      type: REMOVE_CARTITEM,
      payload: {
         id
      }
   });
   dispatch({
      type: CALCULATE_QTYANDPRICE
   });
}

export function changeQuantity(dispatch, id, quantity) {
   dispatch({
      type: CHANGE_QUANTITY,
      payload: {
         id,
         quantity
      }
   });
   dispatch({ type: CALCULATE_QTYANDPRICE });
}

const CartStore = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, InitialState);

   const savePayInfo = useCallback(function (name, values) {
      dispatch({
         type: SAVE_PAYINFO,
         payload: {
            name,
            data: values
         }
      });
   }, []);

   let value = useMemo(
      () => ({
         cartList: state.cartList,
         itemsPrice: state.itemsPrice,
         shippingPrice: state.shippingPrice,
         totalPrice: state.totalPrice,
         totalQuantity: state.totalQuantity,
         shippingAddress: state.shippingAddress,
         paymentMethod: state.paymentMethod
      }),
      [state]
   );

   let actions = useMemo(
      () => ({
         dispatchCart: dispatch,
         savePayInfo
      }),
      [dispatch, savePayInfo]
   );

   return (
      <CartStateProvider value={value}>
         <CartActionProvider value={actions}>{children}</CartActionProvider>
      </CartStateProvider>
   );
};

export default CartStore;
