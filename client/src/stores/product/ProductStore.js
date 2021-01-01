import React, {useReducer, useCallback, useMemo} from 'react';
import {ProductProvider} from './productContext';
import {ProductsProvider} from './productsContext';
import useFetch from '../../customhooks/useFetch';

const ProductStore = ({
	children
}) => {
    const [stateProducts, lazyFetchProducts] = useFetch({
    initialUrl: null,
    initialData: {
      state: [],
      method: 'get'
    }
  });
   const [stateProduct, lazyFetchProduct] = useFetch({
       initialUrl: null,
       initialData: {
         state: {},
         method: 'get'
       }
     });


let valueProducts = useMemo(() => ({
   products: stateProducts.data.products,   
   loadingProducts: stateProducts.loading,
   errorProducts: stateProducts.error,
   getAllProducts: lazyFetchProducts
}), [stateProducts, lazyFetchProducts])

let valueProduct = useMemo(() => ({
   product: stateProduct.data.product,   
   loadingProduct: stateProduct.loading,
   errorProduct: stateProduct.error,
   getProduct: lazyFetchProduct
}))

	return (
      <ProductsProvider value = {valueProducts}>
         <ProductProvider value = {valueProduct}>            
      	    {children}
         </ProductProvider>
      </ProductsProvider>
		)
}




export default ProductStore;