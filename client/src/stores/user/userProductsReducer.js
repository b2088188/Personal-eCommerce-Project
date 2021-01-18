import { REQUEST_RESOLVED, CREATE_USERPRODUCT, GET_USERPRODUCTS } from '../types';
import { fetchReducer } from '../../customhooks/useFetch';

function userReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data,
            error: null
         };
      case GET_USERPRODUCTS:
         return {
            ...currentState,
            userProducts: currentState.data.products,
            status: 'resolved'
         };
      case CREATE_USERPRODUCT:
         return {
            ...currentState,
            userProducts: [...currentState.userProducts, currentState.data.product],
            status: 'resolved'
         };
   }
   return fetchReducer(currentState, action);
}

export default userReducer;
