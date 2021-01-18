import * as R from 'ramda';
import { fetchReducer } from '../../customhooks/useFetch';
import {
   REQUEST_RESOLVED,
   GET_PRODUCTS,
   CREATE_PRODUCT,
   UPDATE_PRODUCT,
   DELETE_PRODUCT
} from '../types';
function productReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data,
            error: null
         };
      case GET_PRODUCTS:
         return {
            ...currentState,
            products: currentState.data.products,
            status: 'resolved'
         };
      case CREATE_PRODUCT:
         return {
            ...currentState,
            products: [...currentState.userProducts, currentState.data.product],
            status: 'resolved'
         };
      case UPDATE_PRODUCT:
         return {
            ...currentState,
            products: R.update(
               (el) => el._id === currentState.data.product._id,
               currentState.data.product,
               currentState.products
            ),
            status: 'resolved'
         };
      case DELETE_PRODUCT:
         return {
            ...currentState,
            products: R.reject((el) => el._id === action.payload.productId, currentState.products),
            status: 'resolved'
         };
   }
   return fetchReducer(currentState, action);
}

export default productReducer;
