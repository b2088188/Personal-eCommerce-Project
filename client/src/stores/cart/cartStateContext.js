import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CartStateContext = createContext();

export const CartStateProvider = CartStateContext.Provider;

/* eslint-disable */
export const useCartState = useContextFactory('CartStateContext', CartStateContext);

export default CartStateContext;



