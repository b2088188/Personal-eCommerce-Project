import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const OrderStateContext = createContext();
OrderStateContext.displayName = 'OrderStateContext';

export const OrderStateProvider = OrderStateContext.Provider;

/* eslint-disable */
export const useOrderState = useContextFactory('OrderStateContext', OrderStateContext);

export default OrderStateContext;