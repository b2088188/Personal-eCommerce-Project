import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ProductContext = createContext();
ProductContext.displayName = 'ProductContext';

export const ProductProvider = ProductContext.Provider;
/* eslint-disable */
export const useProduct = useContextFactory('ProductContext', ProductContext);

export default ProductContext;