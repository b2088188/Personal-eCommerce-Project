import './productview.scss';
import React, { useEffect, useContext } from 'react';
import ProductContext from '../../stores/product/productContext';
import ProductItem from './ProductItem';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';


const ProductView = () => {
    const { products, loading, error, getAllProducts } = useContext(ProductContext);

    useEffect(() => {
        getAllProducts();
    }, [])

    function renderProducts(list) {
        return list.map(function generateItem(product) {
            return <ProductItem key = {product._id} product = {product} />
        })
    }
    
    if (loading)
        return <Spinner  />
    if (error)
        return <Message alert = {error} severity = 'error' />
    return (
        <div className = "product-view">
        <h1 className = "product-view__title">Latest Products</h1>
        <div className = "product-view__productbox">
          {renderProducts(products)}
        </div>
      </div>
    )
}

export default ProductView;