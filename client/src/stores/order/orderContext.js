import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const OrderStateContext = createContext();
OrderStateContext.displayName = 'OrderStateContext';
const OrderActionContext = createContext();
OrderActionContext.displayName = 'OrderActionContext';

export const OrderStateProvider = OrderStateContext.Provider;
export const OrderActionProvider = OrderActionContext.Provider;

/* eslint-disable */
const useOrderState = useContextFactory('OrderStateContext', OrderStateContext);
const useOrderActions = useContextFactory('OrderActionContext', OrderActionContext);

const useOrder = () => [useOrderState(), useOrderActions()];
export default useOrder;
