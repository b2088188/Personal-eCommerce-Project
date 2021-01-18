import React, { useCallback, useMemo } from 'react';
import { UserStateProvider } from './userStateContext';
import { UserActionProvider } from './userActionContext';
import userProductsReducer from './userProductsReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { GET_USERPRODUCTS, CREATE_USERPRODUCT } from '../types';

const UserStore = ({ children }) => {
   const [stateUserProfile, fetchUserProfile] = useFetch({
      data: {}
   });
   const [stateUserOrders, fetchUserOrders] = useFetch({
      data: []
   });

   const [stateUserProducts, fetchUserProducts, dispatchUserProducts] = useFetch(
      {
         data: {},
         userProducts: []
      },
      userProductsReducer
   );

   const getUserProfile = useCallback(
      async function () {
         fetchUserProfile(axios.get('/api/v1/users/profile'));
      },
      [fetchUserProfile]
   );

   const getUserProducts = useCallback(
      async function (userId) {
         const { status } = await fetchUserProfile(axios.get(`/api/v1/products/?user=${userId}`));
         if (status === 'success') dispatchUserProducts({ type: GET_USERPRODUCTS });
      },
      [fetchUserProducts, dispatchUserProducts]
   );

   const createUserProduct = useCallback(
      async function (values) {
         const formData = new FormData();
         const fields = Object.keys(values);
         fields.forEach((el) => {
            if (el === 'image') return formData.append('image', values[el][0]);
            formData.append(el, values[el]);
         });
         const { status } = await fetchUserProducts(axios.post('/api/v1/products', formData));
         if (status === 'success') dispatchUserProducts({ type: CREATE_USERPRODUCT });
      },
      [fetchUserProducts, dispatchUserProducts]
   );

   const value = useMemo(
      () => ({
         userProfile: stateUserProfile.data.user,
         statusUserProfile: stateUserProfile.status,
         errorUserProfile: stateUserProfile.error,
         userOrders: stateUserOrders.data.orders,
         statusUserOrders: stateUserOrders.status,
         errorUserOrders: stateUserOrders.error,
         userProducts: stateUserProducts.userProducts,
         statusUserProducts: stateUserProducts.status,
         errorUserProducts: stateUserProducts.error
      }),
      [stateUserProfile, stateUserOrders, stateUserProducts]
   );

   const actions = useMemo(
      () => ({
         getUserProfile,
         userOrdersHandle: fetchUserOrders,
         createUserProduct,
         getUserProducts
      }),
      [getUserProfile, fetchUserOrders, createUserProduct, getUserProducts]
   );

   return (
      <UserStateProvider value={value}>
         <UserActionProvider value={actions}>{children}</UserActionProvider>
      </UserStateProvider>
   );
};

export default UserStore;
