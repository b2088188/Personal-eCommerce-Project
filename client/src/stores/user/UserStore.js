import React, {useReducer, useCallback} from 'react';
import {UserProvider} from './userContext';
import userReducer from './userReducer';
import axios from 'axios';
import {
LOADING_PROFILE,
PROFILE_SUCCESS,
PROFILE_FAIL
} from '../types';

const InitialState = {
	user: null,
	loading: null,
	error: null
}

const UserStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(userReducer, InitialState);    
    const getUserProfile = useCallback(async function () {
        	try {
        		dispatch({type: LOADING_PROFILE});
        	   const {data: {data}} = await axios.get('/api/v1/users/profile');
        	   dispatch({
        	   	type: PROFILE_SUCCESS,
        	   	payload: {
        	   		user: data.user
        	   	}
        	   })
        	}
        	catch({response: {data}}) {
        	        dispatch({
        	        	type: PROFILE_FAIL,
        	        	payload: {
        	        		error: data.message
        	        	}
        	        })
        	}
        }, []);

	const value = {
	  user: state.user,
	  loading: state.loading,
	  error: state.error,
      getUserProfile
	}

	return (
     <UserProvider value = {value}>
     	{children}
     </UserProvider>
		)
}

export default UserStore;