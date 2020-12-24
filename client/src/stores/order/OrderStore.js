import React, {useReducer} from 'react';
import {OrderProvider} from './orderContext';
import orderReducer from './orderReducer';
import axios from 'axios';
import {
LOADING_ORDER,
ORDER_SUCCESS,
ORDER_FAIL
} from '../types';

const InitialState = {
	orderList: [],
	currentOrder: null,
	createStatus: null,
	error: null
}

const OrderStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(orderReducer, InitialState);
	

   async function createOrder(values) {
   		try {
   		  const {data: {data}} = await axios.post('api/v1/orders', values);
   		  dispatch({
   		  	type: ORDER_SUCCESS,
   		  	payload: {
   		  		order: data.order
   		  	}
   		  })
   		}
   		catch({response: {data}}) {
		   dispatch({
		   	type: ORDER_FAIL,
		   	payload: {
		   		error: data.message
		   	}
		   })     
   		}
   }

	const value = {
		orderList: state.orderList,
		currentOrder: state.currentOrder,
		createStatus: state.createStatus,
		createOrder
	}

	return (
	<OrderProvider value = {value}>
		{children}
	</OrderProvider>
		)
}

export default OrderStore;