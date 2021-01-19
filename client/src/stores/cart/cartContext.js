import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CartStateContext = createContext();
CartStateContext.displayName = 'CartStateContext';
const CartActionContext = createContext();
CartActionContext.displayName = 'CartActionContext';

export const CartStateProvider = CartStateContext.Provider;
export const CartActionProvider = CartActionContext.Provider;

/* eslint-disable */
const useCartState = useContextFactory('CartStateContext', CartStateContext);
const useCartActions = useContextFactory('CartActionContext', CartActionContext);
const useCart = () => [useCartState(), useCartActions()];

export default useCart;
