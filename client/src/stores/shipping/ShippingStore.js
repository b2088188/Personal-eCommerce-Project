import React, {useReducer} from 'react';
import {ShippingProvider} from './shippingContext';
import shippingReducer from './shippingReducer';

const InitialState = {
	shippingAddress
}

const ShippingStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(shippingReducer, InitialState);



const value = {

}

	return (
    <ShippingProvider value = {value}>
    	{children}
    </ShippingProvider>
		)
}

export default ShippingStore;