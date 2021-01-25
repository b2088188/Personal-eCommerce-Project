import { fetchReducer } from '../../customhooks/useFetch';
import { REQUEST_RESOLVED, CREATE_ORDER, GET_ORDER, UPDATE_ORDER, CLEAR_ORDER } from '../types';

function orderReducer(currentState, action) {
	switch (action.type) {
		case REQUEST_RESOLVED:
			return {
				...currentState,
				data: action.payload.data,
				error: null
			};
		case CREATE_ORDER:
		case GET_ORDER:
			return {
				...currentState,
				currentOrder: currentState.data.order,
				status: 'resolved'
			};
		case UPDATE_ORDER:
			return {
				...currentState,
				currentOrder: currentState.data.order,
				status: 'resolved'
			};
		case CLEAR_ORDER:
			return {
				...currentState,
				currentOrder: null,
				status: 'idle',
				error: null
			};
	}
	return fetchReducer(currentState, action);
}

export default orderReducer;
