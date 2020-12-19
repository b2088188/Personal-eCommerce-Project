import * as R from 'ramda';
import {
LOADING_CARTLIST,
CARTLIST_SUCCESS,
ADD_CARTITEM,
REMOVE_CARTITEM,
CHANGE_QUANTITY,
CALCULATE_QTYANDPRICE
} from '../types';

function cartReducer(currentState, action) {
	switch(action.type) {
		case LOADING_CARTLIST:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case CARTLIST_SUCCESS:
		  return {
		  	...currentState,
		  	cartList: action.payload.cartList,
		  	loading: false
		  }
		case ADD_CARTITEM:
		  return {
		  	...currentState,
		  	cartList: R.uniqBy(R.prop('_id'), [...currentState.cartList, action.payload.item])
		  }
		case CALCULATE_QTYANDPRICE:
		  return {
		  	...currentState,
		  	totalPrice: currentState.cartList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2),
		  	totalQuantity: currentState.cartList.reduce((acc, cur) => acc + cur.quantity, 0)
		  }
		case CHANGE_QUANTITY:
		const index = R.findIndex(R.propEq('_id', action.payload.id))(currentState.cartList);
		  return {
		  	...currentState,
            cartList: R.update(index, {...currentState.cartList[index], ['quantity']: action.payload.quantity}, currentState.cartList)
		  }
		case REMOVE_CARTITEM:
		  return {
		  	...currentState,
		  	cartList: R.reject(el => el._id === action.payload.id, currentState.cartList)
		  }
		default:
		  return currentState;
	}
}

export default cartReducer;