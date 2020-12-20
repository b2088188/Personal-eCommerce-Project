import {
LOADING_AUTH,
AUTH_SUCCESS,
AUTH_FAIL,
LOGOUT_SUCCESS
} from '../types';

function authReducer(currentState, action) {
	switch(action.type) {
		case AUTH_SUCCESS:
		  return {
		  	...currentState,
		  	user: action.payload.user,
		  	token: action.payload.token,
		  	isAuthenticated: true
		  }
		default:
		  return currentState;
	}
}

export default authReducer;