import * as R from 'ramda';
import React, {useReducer, useCallback} from 'react';
import {OrderProvider} from './orderContext';
import orderReducer from './orderReducer';
import axios from 'axios';
import {
LOADING_ORDER,
ORDERCREATE_SUCCESS,
ORDERGET_SUCCESS,
ORDERUPDATE_SUCCESS,
ORDER_FAIL,
CLEAR_ORDER
} from '../types';

const InitialState = {
	orderList: [],
	currentOrder: null,
	loading: null,
	error: null
}

const OrderStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(orderReducer, InitialState);
	

   async function createOrder(values) {
   		try {
   		  const {data: {data}} = await axios.post('/api/v1/orders', values);
   		  dispatch({
   		  	type: ORDERCREATE_SUCCESS,
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

   const getOrder = useCallback(async function (id) {
      	try {
      		dispatch({type: LOADING_ORDER});
      	   const {data: {data}} = await axios.get(`/api/v1/orders/${id}`);
          dispatch({
          	type: ORDERGET_SUCCESS,
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
      }, []);

   	async function updateOrderToPaid(id, result) {
   		try {			
   		   const {data: {data}} = await axios.patch(`/api/v1/orders/${id}`, {
   		   	paymentResult: R.pick(['id', 'update_time', 'status'], result)
   		   });   
   		   dispatch({
   		   	type: ORDERUPDATE_SUCCESS,
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

   	const clearOrder = useCallback(function () {
   	   		dispatch({type: CLEAR_ORDER});
   	   	}, []);

	const value = {
		orderList: state.orderList,
		currentOrder: state.currentOrder,
		loading: state.loading,
		error: state.error,
		createOrder,
		getOrder,
		updateOrderToPaid,
		clearOrder
	}

	return (
	<OrderProvider value = {value}>
		{children}
	</OrderProvider>
		)
}

export default OrderStore;