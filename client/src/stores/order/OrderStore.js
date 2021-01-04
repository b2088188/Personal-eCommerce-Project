import React, {useCallback, useMemo} from 'react';
import {OrderStateProvider} from './orderStateContext';
import {OrderActionProvider} from './orderActionContext';
import orderReducer from './orderReducer';
import useFetch from '../../customhooks/useFetch';
import {
LOADING_ORDER,
ORDERCREATE_SUCCESS,
ORDERGET_SUCCESS,
ORDERUPDATE_SUCCESS,
ORDER_FAIL,
CLEAR_ORDER
} from '../types';


const OrderStore = ({
	children
}) => {
   const [stateOrder, fetchOrder] = useFetch({
    data: {}
  });

   // async function createOrder(values) {
   // 		try {
   // 		  const {data: {data}} = await axios.post('/api/v1/orders', values);
   // 		  dispatch({
   // 		  	type: ORDERCREATE_SUCCESS,
   // 		  	payload: {
   // 		  		order: data.order
   // 		  	}
   // 		  })
   // 		}
   // 		catch({response: {data}}) {
		 //   dispatch({
		 //   	type: ORDER_FAIL,
		 //   	payload: {
		 //   		error: data.message
		 //   	}
		 //   })     
   // 		}
   // }

   // const getOrder = useCallback(async function (id) {
   //    	try {
   //    		dispatch({type: LOADING_ORDER});
   //    	   const {data: {data}} = await axios.get(`/api/v1/orders/${id}`);
   //        dispatch({
   //        	type: ORDERGET_SUCCESS,
   //        	payload: {
   //        		order: data.order
   //        	}
   //        })
   //    	}
   //    	catch({response: {data}}) {
   //    	        dispatch({
   // 		   	type: ORDER_FAIL,
   // 		   	payload: {
   // 		   		error: data.message
   // 		   	}
   // 		   })  
   //    	}
   //    }, []);

   // 	async function updateOrderToPaid(id, result) {
   // 		try {			
   // 		   const {data: {data}} = await axios.patch(`/api/v1/orders/${id}`, {
   // 		   	paymentResult: R.pick(['id', 'update_time', 'status'], result)
   // 		   });   
   // 		   dispatch({
   // 		   	type: ORDERUPDATE_SUCCESS,
   // 		   	payload: {
   // 		   		order: data.order
   // 		   	}
   // 		   })
   // 		}
   // 		catch({response: {data}}) {
   // 		        dispatch({
   // 		   	type: ORDER_FAIL,
   // 		   	payload: {
   // 		   		error: data.message
   // 		   	}
   // 		   })  
   // 		}
   // 	}

   // 	const clearOrder = useCallback(function () {
   // 	   		dispatch({type: CLEAR_ORDER});
   // 	   	}, []);

	const value = useMemo(() => ({
				currentOrder: stateOrder.data.order,
				statusOrder: stateOrder.status,
				errorOrder: stateOrder.error
			}), [stateOrder])

	const actions = useMemo(() => ({
				orderHandle: fetchOrder
			}), [fetchOrder])

	return (
	<OrderStateProvider value = {value}>
		<OrderActionProvider value = {actions}>
			{children}
		</OrderActionProvider>
	</OrderStateProvider>
		)
}

export default OrderStore;