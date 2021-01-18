import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ProductsContext = createContext();
ProductsContext.displayName = 'ProductsContext';

export const ProductsProvider = ProductsContext.Provider;
/* eslint-disable */
export const useProducts = useContextFactory('ProductsContext', ProductsContext);

export default ProductsContext;