import { fetchReducer } from '../../customhooks/useFetch';
import { REQUEST_RESOLVED, GET_ORDERLIST, UPDATE_ORDER, CLEAR_ORDER } from '../types';

function orderListReducer(currentState, action) {
	switch (action.type) {
		case REQUEST_RESOLVED:
			return {
				...currentState,
				data: action.payload.data,
				error: null
			};
		case GET_ORDERLIST:
		case UPDATE_ORDER:
			return {
				...currentState,
				orderList: currentState.data.orders,
				status: 'resolved'
			};
		case CLEAR_ORDER:
			return {
				...currentState,
				currentOrder: null
			};
	}
	return fetchReducer(currentState, action);
}

export default orderListReducer;
