import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const OrderActionContext = createContext();
OrderActionContext.displayName = 'OrderActionContext';

export const OrderActionProvider = OrderActionContext.Provider;

/* eslint-disable */
export const useOrderActions = useContextFactory('OrderActionContext', OrderActionContext);

export default OrderActionContext;