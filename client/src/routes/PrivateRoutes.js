import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuthState} from '../stores/auth/authStateContext';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {user} = useAuthState();
	return (
       <Route {...rest} render = {(props) => user ? 
       (<Component {...props} />) : (
                                                               <Redirect to = {{
                                                               	pathname: '/login',
                                                               	state: {from: props.location}
                                                               }} />
                                                            )
        } />
		)
}

export default PrivateRoute;