import React, { useReducer, useCallback } from 'react';
import { UserProvider } from './userContext';
import userReducer from './userReducer';
import axios from 'axios';
import {
    LOADING_PROFILE,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    LOADING_USERORDERS,
    USERORDERS_SUCCESS,
    USERORDERS_FAIL
} from '../types';

const InitialState = {
    user: null,
    loading: null,
    error: null,
    orders: []
}

const UserStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(userReducer, InitialState);
    const getUserProfile = useCallback(async function() {
        try {
            dispatch({ type: LOADING_PROFILE });
            const { data: { data } } = await axios.get('/api/v1/users/profile');
            dispatch({
                type: PROFILE_SUCCESS,
                payload: {
                    user: data.user
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: PROFILE_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }, [])

    async function updateUserProfile(values) {
        try {
            dispatch({ type: LOADING_PROFILE });
            const { data: { data } } = await axios.patch('/api/v1/users/profile', values);
            dispatch({
                type: PROFILE_SUCCESS,
                payload: {
                    user: data.user
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: PROFILE_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

   const getUserOrders = useCallback(async function () {
       	try {
   	   dispatch({type: LOADING_USERORDERS})
       	   const {data: {data}} = await axios.get('/api/v1/users/orders');
       	   dispatch({
       	   	type: USERORDERS_SUCCESS,
       	   	payload: {
       	   	   orders: data.orders
       	   	}
       	   })
       	}
       	catch({response: {data}}) {
             dispatch({
                   type: USERORDERS_FAIL,
                   payload: {
                       error: data.message
                   }
               })
       	}    			
       }, [])

    const value = {
        user: state.user,
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        getUserProfile,
        updateUserProfile,
        getUserOrders
    }

    return (
        <UserProvider value = {value}>
     	{children}
     	</UserProvider>
    )
}

export default UserStore;