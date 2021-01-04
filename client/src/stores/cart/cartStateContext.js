import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CartStateContext = createContext();
CartStateContext.displayName = 'CartStateContext';

export const CartStateProvider = CartStateContext.Provider;

/* eslint-disable */
export const useCartState = useContextFactory('CartStateContext', CartStateContext);

export default CartStateContext;



