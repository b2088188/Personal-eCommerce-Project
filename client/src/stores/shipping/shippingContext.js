import {createContext} from 'react';

const ShippingContext = createContext();

export const ShippingProvider = ShippingContext.Provider;

export default ShippingContext;