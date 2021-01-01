import styled from 'styled-components';
import {Container, Title} from '../../design/components';
import React, { useEffect} from 'react';
import useFetch from '../../customhooks/useFetch';
import {useProducts} from '../../stores/product/productsContext';
import ProductItem from './ProductItem';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';


const ProductView = ({
    className
}) => {
    const {products, loadingProducts, errorProducts, getAllProducts} = useProducts();
    useEffect(() =>{
        getAllProducts('/api/v1/products')
    }, [getAllProducts])

    function renderProducts(list) {
        return list?.map(function generateItem(product) {
            return <ProductItem key = {product._id} product = {product} />
        })
    }

    

    if (loadingProducts)
        return <Spinner  />
    if (errorProducts)
        return <Message alert = {errorProducts} severity = 'error' />
    return (
        <Container>            
        <div className = {className}>
        <Title modifiers = 'big'>Latest Products</Title>
        <div className = "itemcontainer">
          {renderProducts(products)}
        </div>
      </div>
        </Container>
    )
}

export default styled(ProductView)`
    width: 70%;
    margin: auto;
    .itemcontainer{
        display: flex;
        flex-wrap: wrap;
    }
`;