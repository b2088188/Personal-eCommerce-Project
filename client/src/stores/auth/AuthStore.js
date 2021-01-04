import * as R from 'ramda';
import React, {useMemo} from 'react';
import {AuthStateProvider} from './authStateContext';
import {AuthActionProvider} from './authActionContext';
import useFetch from '../../customhooks/useFetch';


const AuthStore = ({
	children
}) => {
	const [stateAuth, fetchAuth] = useFetch({
    data: {}
  });

// const authHandle = R.curry(async function (action, values) {
// 	try {
//             dispatch({type: LOADING_AUTH});
//    	      const {data: {data}} = await axios.post(`/api/v1/users/${action}`, values);   	      
//    	      dispatch({
//    	      	type: AUTH_SUCCESS,
//    	      	payload: {
//    	      		user: data.user,
//    	      		token: data.token
//    	      	}
//    	      })
//    	   }
//    	   catch({response: {data}}) {
//    	         dispatch({
//    	         	type: AUTH_FAIL,
//    	         	payload: {
//    	         		error: data.message
//    	         	}
//    	         })  
//    	   }
// }, 2);


const value = useMemo(() =>({
   user: stateAuth.data.user,
   token: stateAuth.data.token,   
   statusAuth: stateAuth.status,
   errorAuth: stateAuth.error   
}), [stateAuth])

const actions = useMemo(() =>({
   authHandle: fetchAuth   
}), [fetchAuth])

	return (
      <AuthStateProvider value = {value}>
         <AuthActionProvider value = {actions}>
            {children}
         </AuthActionProvider>
      </AuthStateProvider>
		)
}

export default AuthStore;