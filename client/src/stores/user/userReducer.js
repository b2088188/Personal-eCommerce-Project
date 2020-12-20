import {
LOADING_PROFILE,
PROFILE_SUCCESS,
PROFILE_FAIL
} from '../types';
function userReducer(currentState, action) {
	switch(action.type) {
		case LOADING_PROFILE:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case PROFILE_SUCCESS:
		  return {
		  	...currentState,
		  	user: action.payload.user,
		  	loading: false
		  }
		case PROFILE_FAIL:
		  return {
		  	...currentState,
		  	error: action.payload.error,
		  	loading: false
		  }
		default:
		  return currentState;
	}
}

export default userReducer;