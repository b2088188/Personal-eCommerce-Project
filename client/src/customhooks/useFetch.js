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

const useFetch = ({ initialUrl, initialData }) => {
  const [Url, setUrl] = useState(initialUrl);
  const [{ data, loading, error }, dispatch] = useReducer(
    fetchReducer,
    {
      data: initialData.state,
      loading: null,
      error: null,
    },
  );

  useEffect(() => {
        if(Url)
   		 fetchData();
    async function fetchData() {
      try {
      dispatch({
        type: LOADING_REQUEST,
      });
         const {data: {data}} = await axios({
				  method: initialData.method,
				  url: Url,
          data: initialData.data
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
  }, [Url, initialData.method, initialData.data]);

  return [
    {
      data,
      loading,
      error,
    },
    setUrl
  ];
};

export default useFetch;
