import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Wrapper, Button, Col, Title, ListGroup } from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';
import { useLocation } from 'react-router-dom';
import useFetch from '../../../customhooks/useFetch';
import { useProducts } from '../../../stores/product/productsContext';
import ProductItem from './ProductItem';
import { Pagination } from '@material-ui/lab';

import axios from 'axios';
const ProductView = ({ className }) => {
   const { products, statusProducts, errorProducts, getAllProducts } = useProducts();
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');
   const [page, setPage] = useState(1);
   useEffect(() => {
      getAllProducts(q);
   }, [getAllProducts, q]);

   function calcPage(results, page, resPerPage = 8) {
      const start = (page - 1) * resPerPage;
      const end = page * resPerPage;
      return results.slice(start, end);
   }

   function renderList(list) {
      return list?.map(function generateItem(product) {
         return <ProductItem key={product._id} product={product} />;
      });
   }

   const renderProducts = R.pipe(calcPage, renderList);

   function onPageChange(event, value) {
      setPage(value);
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
               <Wrapper className='products__titlebox'>
                  <Title className='products__title' modifiers='big'>
                     Search Results
                  </Title>
                  <Button as={Link} to='/' className='home'>
                     Go Back
                  </Button>
               </Wrapper>
               <ListGroup flexy='center' wrap>
                  {renderProducts(products, page)}
               </ListGroup>
               {Math.ceil(products.length / 8) > 1 ? (
                  <Pagination
                     count={Math.ceil(products.length / 8)}
                     page={page}
                     onChange={onPageChange}
                  />
               ) : null}
            </div>
         </Col>
      );
};

export default styled(ProductView)`
   .products {
      width: 70%;
      margin: 2.5rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__titlebox {
         align-self: flex-start;
         margin-bottom: 1rem;
      }
      &__title {
         margin-bottom: 1rem;
      }
   }
`;
