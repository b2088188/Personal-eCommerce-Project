import { fetchReducer } from '../../customhooks/useFetch';
import {
	REQUEST_RESOLVED,
	GET_AUTHINFO,
	REQUEST_REJECTED,
	UPDATE_USERDATA,
	LOGOUT_AUTH
} from '../types';

function authReducer(currentState, action) {
	switch (action.type) {
		case REQUEST_RESOLVED:
			return {
				...currentState,
				data: action.payload.data,
				error: null
			};
		case GET_AUTHINFO:
		case UPDATE_USERDATA:
			if (!currentState.initialAuthCheck)
				return {
					...currentState,
					user: currentState.data?.user || null,
					status: 'resolved',
					initialAuthCheck: true
				};
			return {
				...currentState,
				user: currentState.data?.user || null,
				status: 'resolved'
			};
		case REQUEST_REJECTED:
			if (!currentState.initialAuthCheck)
				return {
					...currentState,
					status: 'rejected',
					initialAuthCheck: true
				};
			return {
				...currentState,
				status: 'rejected',
				error: action.payload.error
			};
		case LOGOUT_AUTH:
			return {
				...currentState,
				user: null,
				status: 'resolved'
			};
	}
	return fetchReducer(currentState, action);
}

export default authReducer;
