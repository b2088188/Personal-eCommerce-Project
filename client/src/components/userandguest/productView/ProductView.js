import styled from 'styled-components';
import { Container, Col, Title, ListGroup } from '../../../design/components';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../../customhooks/useFetch';
import { useProducts } from '../../../stores/product/productsContext';
import ProductItem from './ProductItem';
import { Pagination } from '@material-ui/lab';
import Spinner from '../../../utils/Spinner';
import Message from '../../../utils/Message';
import axios from 'axios';
const ProductView = ({ className }) => {
   const { products, statusProducts, errorProducts, getAllProducts } = useProducts();
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');

   useEffect(() => {
      getAllProducts();
   }, [getAllProducts]);

   function renderProducts(list) {
      return list?.map(function generateItem(product) {
         return <ProductItem key={product._id} product={product} />;
      });
   }

   if (statusProducts === 'idle' || statusProducts === 'pending') return <Spinner />;
   if (statusProducts === 'rejected')
      return (
         <Col width='12'>
            <Message alert={errorProducts} severity='error' />;
         </Col>
      );
   if (statusProducts === 'resolved')
      return (
         <Col width='12' className={className}>
            <div className='products'>
               <Title modifiers='big'>All Products</Title>
               <ListGroup flexy='center' wrap>
                  {renderProducts(products)}
               </ListGroup>
               <Pagination count={10} />
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
