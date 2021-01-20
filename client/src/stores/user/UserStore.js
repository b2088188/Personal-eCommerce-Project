import React, { useCallback, useMemo } from 'react';
import { UserStateProvider, UserActionProvider } from './userContext';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { GET_USERPRODUCTS, CREATE_USERPRODUCT, UPDATE_USERPRODUCT } from '../types';

const UserStore = ({ children }) => {
   const [stateUserProfile, fetchUserProfile] = useFetch({
      data: {}
   });
   const [stateUserOrders, fetchUserOrders] = useFetch({
      data: []
   });

   const getUserProfile = useCallback(
      async function () {
         fetchUserProfile(axios.get('/api/v1/users/profile'));
      },
      [fetchUserProfile]
   );

   const value = useMemo(
      () => ({
         userProfile: stateUserProfile.data.user,
         statusUserProfile: stateUserProfile.status,
         errorUserProfile: stateUserProfile.error,
         userOrders: stateUserOrders.data.orders,
         statusUserOrders: stateUserOrders.status,
         errorUserOrders: stateUserOrders.error
      }),
      [stateUserProfile, stateUserOrders]
   );

   const actions = useMemo(
      () => ({
         getUserProfile,
         userOrdersHandle: fetchUserOrders
      }),
      [getUserProfile, fetchUserOrders]
   );

   return (
      <UserStateProvider value={value}>
         <UserActionProvider value={actions}>{children}</UserActionProvider>
      </UserStateProvider>
   );
};

export default UserStore;
