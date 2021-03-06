import * as R from 'ramda';
import {
	ADD_CARTITEM,
	UPDATE_CARTITEM,
	REMOVE_CARTITEM,
	CHANGE_QUANTITY,
	CALCULATE_QTYANDPRICE,
	SAVE_PAYINFO
} from '../types';

function cartReducer(currentState, action) {
	switch (action.type) {
		case ADD_CARTITEM:
			return {
				...currentState,
				cartList: R.uniqBy(R.prop('product'), [...currentState.cartList, action.payload.item])
			};
		case UPDATE_CARTITEM:
			const cartIndex = currentState.cartList.findIndex(
				(el) => el.product === action.payload.item.product
			);
			return {
				...currentState,
				cartList: R.update(cartIndex, action.payload.item, currentState.cartList)
			};
		case CALCULATE_QTYANDPRICE:
			const itemsPrice = addDecimal(
				currentState.cartList.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
			);
			const shippingPrice = currentState.cartList.length < 1 ? 0 : itemsPrice > 100 ? 0 : 100;
			return {
				...currentState,
				itemsPrice,
				shippingPrice,
				totalPrice: itemsPrice + shippingPrice,
				totalQuantity: currentState.cartList.reduce((acc, cur) => acc + cur.quantity, 0)
			};
		case CHANGE_QUANTITY:
			const index = R.findIndex(R.propEq('product', action.payload.id))(currentState.cartList);
			return {
				...currentState,
				cartList: R.update(
					index,
					{ ...currentState.cartList[index], quantity: action.payload.quantity },
					currentState.cartList
				)
			};
		case REMOVE_CARTITEM:
			return {
				...currentState,
				cartList: R.reject((el) => el.product === action.payload.id, currentState.cartList)
			};
		case SAVE_PAYINFO:
			return {
				...currentState,
				...{ [action.payload.name]: action.payload.data }
			};
		default:
			return currentState;
	}
}

function addDecimal(number) {
	return +(Math.round(number * 100) / 100).toFixed(2);
}

export default cartReducer;
