import { useState, useEffect, useReducer, useCallback } from 'react';
import {
REQUEST_PENDING,
REQUEST_RESOLVED,
REQUEST_REJECTED 
} from '../stores/types';
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
      throw new Error(`Unhandled action type: ${action.type}`)
  }
};



const useFetch = (initialState) => {
  const [state, unSafeDispatch] = useReducer(
    fetchReducer,
    {
      status: 'idle',
      data: null,      
      error: null,
      ...initialState
    },
  );

  const dispatch = useSafeDispatch(unSafeDispatch);
  const run = useCallback((promise) => {
    fetchData();
   async function fetchData() {
    unSafeDispatch({type: REQUEST_PENDING});
    try {
     const {data: {data}} = await promise;
     unSafeDispatch({
      type: REQUEST_RESOLVED,
      payload: {
        data
      }
     })
    }
    catch({response: {data}}) {
     unSafeDispatch({
      type: REQUEST_REJECTED,
      payload: {
        error: data.message
      }
     })       
    }        
  }
  }, [dispatch])

  return [state, run];
};

export default useFetch;
