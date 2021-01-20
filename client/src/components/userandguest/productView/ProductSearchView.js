import * as R from 'ramda';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
   Row,
   Col,
   Wrapper,
   CenterWrapper,
   Button,
   Title,
   ListGroup,
   Icon,
   Span
} from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../../stores/product/productsContext';
import ProductItem from './ProductItem';
import { Pagination } from '@material-ui/lab';
import { FilterList } from '@material-ui/icons';
import Menu from '../../../utils/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const ProductView = ({ className }) => {
   const { products, statusProducts, errorProducts, getSortedProducts } = useProducts();
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');
   const [sort, setSort] = useState(null);
   const [page, setPage] = useState(1);
   const [open, setOpen] = useState(false);
   const anchorRef = useRef(null);
   useEffect(() => {
      getSortedProducts(q, sort);
   }, [getSortedProducts, q, sort]);

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

   function onSortClick(sortBy) {
      return function () {
         setSort(sortBy);
         setOpen(false);
      };
   }

   if (statusProducts === 'idle' || statusProducts === 'pending')
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );
   if (statusProducts === 'rejected' && errorProducts)
      return (
         <Row>
            <Message text={errorProducts} severity='error' />;
         </Row>
      );
   if (statusProducts === 'resolved')
      return (
         <Row className={className}>
            <Col width='12'>
               <CenterWrapper width='70' my='2' className='products'>
                  <Wrapper className='products__titlebox'>
                     <Title className='products__title' modifiers='big'>
                        Search Results
                     </Title>
                     <Button as={Link} to='/' className='home'>
                        Go Back
                     </Button>
                     <>
                        <Button
                           ref={anchorRef}
                           onClick={() => setOpen((prev) => !prev)}
                           modifiers='transparent'
                           className='products__button'
                        >
                           <Icon as={FilterList} />
                           <Span>Sort By</Span>
                        </Button>
                        <Menu open={open} setOpen={setOpen} anchorRef={anchorRef}>
                           <MenuItem onClick={onSortClick('price')}>Price (Low -> High)</MenuItem>
                           <MenuItem onClick={onSortClick('-price')}>Price (High -> Low)</MenuItem>
                           <MenuItem onClick={onSortClick('-ratingsAverage')}>Top Rating</MenuItem>
                        </Menu>
                     </>
                  </Wrapper>
                  <ListGroup flexy='center' wrap='true'>
                     {renderProducts(products, page)}
                  </ListGroup>
                  {Math.ceil(products.length / 8) > 1 ? (
                     <Pagination
                        count={Math.ceil(products.length / 8)}
                        page={page}
                        onChange={onPageChange}
                     />
                  ) : null}
               </CenterWrapper>
            </Col>
         </Row>
      );
};

export default styled(ProductView)`
   .products {
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
      &__button {
         color: #333;
         margin-left: 1rem;
      }
   }
`;
