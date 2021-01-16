import React, { useCallback, useMemo } from 'react';
import { OrderStateProvider } from './orderStateContext';
import { OrderActionProvider } from './orderActionContext';
import orderReducer from './orderReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { CREATE_ORDER, GET_ORDER, UPDATE_ORDER, ORDER_FAIL, CLEAR_ORDER } from '../types';

const OrderStore = ({ children }) => {
   const [stateOrder, fetchOrder, dispatchOrder] = useFetch(
      {
         data: {},
         currentOrder: null
      },
      orderReducer
   );

   const createOrder = useCallback(
      async function (values) {
         const { status } = await fetchOrder(axios.post('/api/v1/orders', values));
         if (status === 'success') dispatchOrder({ type: CREATE_ORDER });
      },
      [fetchOrder, dispatchOrder]
   );

   const getOrder = useCallback(
      async function (orderId) {
         const { status } = await fetchOrder(axios.get(`/api/v1/orders/${orderId}`));
         if (status === 'success')
            dispatchOrder({
               type: GET_ORDER
            });
      },
      [fetchOrder, dispatchOrder]
   );

   const updateOrderToPaid = useCallback(
      async function (orderId, values) {
         const { status } = await fetchOrder(axios.patch(`/api/v1/orders/${orderId}`, values));
         if (status === 'success')
            dispatchOrder({
               type: UPDATE_ORDER
            });
      },
      [fetchOrder, dispatchOrder]
   );

   //    const clearOrder = useCallback(function () {
   //             dispatch({type: CLEAR_ORDER});
   //          }, []);

   const value = useMemo(
      () => ({
         currentOrder: stateOrder.currentOrder,
         statusOrder: stateOrder.status,
         errorOrder: stateOrder.error
      }),
      [stateOrder]
   );

   const actions = useMemo(
      () => ({
         createOrder,
         getOrder,
         updateOrderToPaid
      }),
      [createOrder, getOrder, updateOrderToPaid]
   );

   return (
      <OrderStateProvider value={value}>
         <OrderActionProvider value={actions}>{children}</OrderActionProvider>
      </OrderStateProvider>
   );
};

export default OrderStore;
