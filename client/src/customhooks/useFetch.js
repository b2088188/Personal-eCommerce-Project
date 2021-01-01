import { useState, useEffect, useReducer } from 'react';
import {
LOADING_REQUEST,
REQUEST_SUCCESS,
REQUEST_FAIL
} from '../stores/types';
import axios from 'axios';


const fetchReducer = (currentState, action) => {
  switch (action.type) {
    case LOADING_REQUEST:
      return {
        ...currentState,
        loading: true
      };
    case REQUEST_SUCCESS:
      return {
        ...currentState,
        data: action.payload.data,
        loading: false
      };
    case REQUEST_FAIL:
      return {
        ...currentState,
        error: action.payload.error
      };
    default:
      return currentState;
  }
};

const useFetch = ({ initialData }) => {
  const [ajax, setAjax] = useState(initialData);
  const [{ data, loading, error }, dispatch] = useReducer(
    fetchReducer,
    {
      data: initialData.state,
      loading: null,
      error: null,
    },
  );

  useEffect(() => {
        if(ajax.Url)
   		 fetchData();
    async function fetchData() {
      try {
      dispatch({
        type: LOADING_REQUEST,
      });
         const {data: {data}} = await axios({
				  method: initialData.method,
				  url: ajax.Url,
          data: ajax.data
				});
          dispatch({
            type: REQUEST_SUCCESS,
            payload: {
              data,
            },
          });
      } catch ({response: {data}}) {
          dispatch({
            type: REQUEST_FAIL,
            payload: {
            	error: data.message
            }
          });
      }
    }
  }, [ajax, initialData.method]);

  return [
    {
      data,
      loading,
      error,
    },
    setAjax
  ];
};

export default useFetch;
