import {
LOADING_ORDER,
ORDERCREATE_SUCCESS,
ORDERGET_SUCCESS,
ORDERUPDATE_SUCCESS,
ORDER_FAIL,
CLEAR_ORDER
} from '../types';

function orderReducer(currentState, action) {
	switch(action.type) {
		case LOADING_ORDER:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case ORDERCREATE_SUCCESS:
		  return {
		  	...currentState,
		  	orderList: [...currentState.orderList, action.payload.order],
		  	currentOrder: action.payload.order,
		  	loading: false
		  }
	    case ORDERGET_SUCCESS:
	    case ORDERUPDATE_SUCCESS:
	      return {
	      	...currentState,
	      	currentOrder: action.payload.order,
	      	loading: false
	      }
	    case ORDER_FAIL:
	      return {
	      	...currentState,
	      	createStatus: 'fail',
	      	error: action.payload.error,
	      	loading: false
	      }
	    case CLEAR_ORDER:
	      return {
	      	...currentState,
	      	currentOrder: null
	      }
		default:
		  return currentState;
	}
}

export default orderReducer;