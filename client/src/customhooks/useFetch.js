// import { useReducer, useEffect, Reducer } from 'react';
// import {
// LOADING_REQUEST,
// REQUEST_SUCCESS,
// REQUEST_FAIL
// } from '../stores/types';
// import axios from 'axios';



// function fetchReducer(currentState, action) {
//   switch(action.type) {
//     case LOADING_REQUEST:
//       return {
//         ...currentState,
//         loading: true
//       }
//     case REQUEST_SUCCESS:
//       return {
//         ...currentState,
//         data: action.payload.data
//       }
//     case REQUEST_FAIL:
//       return {
//         ...currentState,
//         loading: false,
//         error: action.payload.error
//       }
//     default:
//       return currentState;
//   }
// }

// const useFetch = (url, method, InitialState) => {
//   cont [state, dispatch] = useReducer(fetchReducer, InitialState);

//  async function fetchData(url, method) {
//        try {
//           dispatch({type: LOADING_REQUEST});
//           const res = await axios({
//             method,
//             url
//           });
//           dispatch({
//             type: REQUEST_SUCCESS,
//             payload: {
//               data: res.data.data.data
//             }
//           })
//        }
//        catch({response: {data}}) {
//           dispatch({
//             type: REQUEST_FAIL,
//             payload: data.message
//           })     
//        }
//      }
   

//   useEffect(() => {
//     if(url)
//     fetchData(url, method);    
//   }, [url])

//   return state;
// }

// export default useFetch;
