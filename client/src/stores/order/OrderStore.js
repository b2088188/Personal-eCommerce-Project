import React, { useEffect, useCallback, useMemo } from 'react';
import { OrderStateProvider, OrderActionProvider } from './orderContext';
import orderReducer from './orderReducer';
import orderListReducer from './orderListReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { CREATE_ORDER, GET_ORDER, GET_ORDERLIST, UPDATE_ORDER } from '../types';

const OrderStore = ({ children }) => {
   const [stateOrder, fetchOrder, dispatchOrder] = useFetch(
      {
         data: {},
         currentOrder: null
      },
      orderReducer
   );

   const [stateAllOrders, fetchAllOrders, dispatchAllOrders] = useFetch(
      {
         data: {},
         orderList: []
      },
      orderListReducer
   );

   const createOrder = useCallback(
      async function (values) {
         const { status } = await fetchOrder(
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders`, values, {
               withCredentials: true
            })
         );
         if (status === 'success') dispatchOrder({ type: CREATE_ORDER });
      },
      [fetchOrder, dispatchOrder]
   );

   const getOrder = useCallback(
      async function (orderId) {
         const { status } = await fetchOrder(
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}`, {
               withCredentials: true
            })
         );
         if (status === 'success')
            dispatchOrder({
               type: GET_ORDER
            });
      },
      [fetchOrder, dispatchOrder]
   );

   const updateOrderToPaid = useCallback(
      async function (orderId, values) {
         const { status } = await fetchOrder(
            axios.patch(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}/pay`,
               values,
               {
                  withCredentials: true
               }
            )
         );
         if (status === 'success')
            dispatchOrder({
               type: UPDATE_ORDER
            });
      },
      [fetchOrder, dispatchOrder]
   );

   const updateOrderToDeliver = useCallback(
      async function (orderId) {
         const { status } = await fetchOrder(
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}/deliver`, {
               withCredentials: true
            })
         );
         if (status === 'success')
            dispatchOrder({
               type: UPDATE_ORDER
            });
      },
      [fetchOrder, dispatchOrder]
   );

   const getAllOrders = useCallback(
      async function () {
         const { status } = await fetchAllOrders(
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders`, {
               withCredentials: true
            })
         );
         if (status === 'success') dispatchAllOrders({ type: GET_ORDERLIST });
      },
      [fetchAllOrders, dispatchAllOrders]
   );

   const value = useMemo(
      () => ({
         currentOrder: stateOrder.currentOrder,
         statusOrder: stateOrder.status,
         errorOrder: stateOrder.error,
         orderList: stateAllOrders.orderList,
         statusAllOrders: stateAllOrders.status,
         errorAllOrders: stateAllOrders.error
      }),
      [stateOrder, stateAllOrders]
   );

   const actions = useMemo(
      () => ({
         dispatchOrder,
         createOrder,
         getOrder,
         updateOrderToPaid,
         updateOrderToDeliver,
         getAllOrders
      }),
      [dispatchOrder, createOrder, getOrder, updateOrderToPaid, updateOrderToDeliver, getAllOrders]
   );

   return (
      <OrderStateProvider value={value}>
         <OrderActionProvider value={actions}>{children}</OrderActionProvider>
      </OrderStateProvider>
   );
};

export default OrderStore;
