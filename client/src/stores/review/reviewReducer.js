import { fetchReducer } from '../../customhooks/useFetch';
import { REQUEST_RESOLVED, GET_REVIEWS, CREATE_REVIEW } from '../types';
function reviewReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data,
            error: null
         };
      case GET_REVIEWS:
         return {
            ...currentState,
            reviews: currentState.data.reviews,
            status: 'resolved'
         };
      case CREATE_REVIEW:
         return {
            ...currentState,
            reviews: [...currentState.reviews, currentState.data.review],
            status: 'resolved'
         };
   }
   return fetchReducer(currentState, action);
}

export default reviewReducer;
