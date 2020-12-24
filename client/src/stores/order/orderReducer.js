import {
LOADING_ORDER,
ORDER_SUCCESS,
ORDER_FAIL
} from '../types';

function orderReducer(currentState, action) {
	switch(action.type) {
		case ORDER_SUCCESS:
		  return {
		  	...currentState,
		  	orderList: [...currentState.orderList, action.payload.order],
		  	currentOrder: action.payload.order,
		  	createStatus: 'success'
		  }
	    case ORDER_FAIL:
	      return {
	      	...currentState,
	      	createStatus: 'fail',
	      	error: action.payload.error
	      }
		default:
		  return currentState;
	}
}

export default orderReducer;