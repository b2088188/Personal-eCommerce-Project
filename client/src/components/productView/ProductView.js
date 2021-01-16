import styled from 'styled-components';
import { Container, Col, Title, ListGroup } from '../../design/components';
import React, { useEffect } from 'react';
import useFetch from '../../customhooks/useFetch';
import { useProducts } from '../../stores/product/productsContext';
import ProductItem from './ProductItem';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';
import axios from 'axios';
const ProductView = ({ className }) => {
   const { products, statusProducts, errorProducts, getAllProducts } = useProducts();
   useEffect(() => {
      getAllProducts();
   }, [getAllProducts]);

   function renderProducts(list) {
      return list?.map(function generateItem(product) {
         return <ProductItem key={product._id} product={product} />;
      });
   }

   if (statusProducts === 'idle' || statusProducts === 'pending') return <Spinner />;
   if (statusProducts === 'rejected') return <Message alert={errorProducts} severity='error' />;
   if (statusProducts === 'resolved')
      return (
         <Col width='12' className={className}>
            <div className='products'>
               <Title modifiers='big'>Latest Products</Title>
               <ListGroup flexy='center' wrap>
                  {renderProducts(products)}
               </ListGroup>
            </div>
         </Col>
      );
};

export default styled(ProductView)`
   .products {
      width: 70%;
      margin: 2.5rem auto;
   }
`;
