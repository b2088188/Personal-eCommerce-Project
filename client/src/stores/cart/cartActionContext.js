import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CartActionContext = createContext();
CartActionContext.displayName = 'CartActionContext';

export const CartActionProvider = CartActionContext.Provider;

/* eslint-disable */
export const useCartActions = useContextFactory('CartActionContext', CartActionContext);

export default CartActionContext;