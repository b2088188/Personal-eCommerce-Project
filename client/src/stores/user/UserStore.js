import React, { useCallback, useMemo } from 'react';
import {UserStateProvider} from './userStateContext';
import {UserActionProvider} from './userActionContext';
import userReducer from './userReducer';
import useFetch from '../../customhooks/useFetch';

const UserStore = ({
    children
}) => {
    const [stateUser, fetchUser] = useFetch({
    data: {}
  });
    const [stateUserOrders, fetchUserOrders] = useFetch({
    data: []
  });

    const value = useMemo(() => ({
        user: stateUser.data.user,
        statusUser: stateUser.status,
        errorUser: stateUser.error,
        userOrders: stateUserOrders.data.orders,
        statusUserOrders: stateUserOrders.status,
        errorUserOrders: stateUserOrders.error
    }), [stateUser, stateUserOrders])

    const actions = useMemo(() => ({
        userHandle: fetchUser,
        userOrdersHandle: fetchUserOrders            
    }), [fetchUser, fetchUserOrders])

    return (
        <UserStateProvider value = {value}>
            <UserActionProvider value = {actions}>
                {children}
            </UserActionProvider>
        </UserStateProvider>
    )
}

export default UserStore;