import React, {useReducer, useCallback, useMemo} from 'react';
import {ProductProvider} from './productContext';
import {ProductsProvider} from './productsContext';
import useFetch from '../../customhooks/useFetch';

const ProductStore = ({
	children
}) => {
    const [stateProducts, fetchProducts] = useFetch({
        data: []
    });
   const [stateProduct, fetchProduct] = useFetch({
    data: {}
   });


let valueProducts = useMemo(() => ({
   products: stateProducts.data.products,   
   statusProducts: stateProducts.status,
   errorProducts: stateProducts.error,
   getAllProducts: fetchProducts
}), [stateProducts, fetchProducts])

let valueProduct = useMemo(() => ({
   product: stateProduct.data.product,   
   statusProduct: stateProduct.status,
   errorProduct: stateProduct.error,
   getProduct: fetchProduct
}), [stateProduct, fetchProduct])

	return (
      <ProductsProvider value = {valueProducts}>
         <ProductProvider value = {valueProduct}>            
      	    {children}
         </ProductProvider>
      </ProductsProvider>
		)
}




export default ProductStore;