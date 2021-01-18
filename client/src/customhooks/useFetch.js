import { useReducer, useCallback } from 'react';
import { REQUEST_PENDING, REQUEST_RESOLVED, REQUEST_REJECTED } from '../stores/types';
import useSafeDispatch from './useSafeDispatch';

const fetchReducer = (currentState, action) => {
   switch (action.type) {
      case REQUEST_PENDING:
         return {
            ...currentState,
            status: 'pending'
         };
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            status: 'resolved',
            data: action.payload.data,
            error: null
         };
      case REQUEST_REJECTED:
         return {
            ...currentState,
            status: 'rejected',
            error: action.payload.error
         };
      default:
         throw new Error(`Unhandled action type: ${action.type}`);
   }
};

export { fetchReducer };

const useAsync = (initialState, reducer = fetchReducer) => {
   const [state, unSafeDispatch] = useReducer(reducer, {
      status: 'idle',
      data: null,
      error: null,
      ...initialState
   });
   const dispatch = useSafeDispatch(unSafeDispatch);

   const run = useCallback(
      async (promise) => {
         return await fetchData();
         async function fetchData() {
            dispatch({ type: REQUEST_PENDING });
            try {
               const { data } = await promise;
               dispatch({
                  type: REQUEST_RESOLVED,
                  payload: {
                     data: data.data
                  }
               });
               return data;
            } catch ({ response: { data } }) {
               dispatch({
                  type: REQUEST_REJECTED,
                  payload: {
                     error: data.message
                  }
               });
               return data;
            }
         }
      },
      [dispatch]
   );

   return [state, run, dispatch];
};

export default useAsync;
