import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Title, ListGroup } from '../../../design/components';
import { media } from '../../../design/utils';
import { Spinner, Message } from '../../../design/elements';
import useFetch from '../../../customhooks/useFetch';
import { useProducts } from '../../../stores/product/productsContext';
import ProductItem from './ProductItem';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
const ProductView = ({ className }) => {
   const { products, statusProducts, errorProducts, getAllProducts } = useProducts();
   const [page, setPage] = useState(1);
   useEffect(() => {
      getAllProducts();
   }, [getAllProducts]);

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

   if (statusProducts === 'idle' || statusProducts === 'pending')
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );
   if (statusProducts === 'rejected')
      return (
         <Row>
            <Message alert={errorProducts} severity='error' />;
         </Row>
      );
   if (statusProducts === 'resolved')
      return (
         <Row>
            <Col width='12' className={className}>
               <div className='products'>
                  <Title className='products__title' modifiers='big'>
                     All Products
                  </Title>
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
         </Row>
      );
};

export default styled(ProductView)`
   .products {
      width: 70%;
      min-height: 90%;
      margin: 2.5rem auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      ${media.phone(`
         min-height: auto;
         `)}
      &__title {
         align-self: flex-start;
      }
   }
`;
