import * as R from 'ramda';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Title, ListGroup } from 'design/components';
import { media } from 'design/utils';
import { FullPageSpinner } from 'components/Spinner';
import ProductItem from './ProductItem';
import { Pagination } from '@material-ui/lab';
import { Select, Option } from 'components/Select';
import { useProductItems } from 'utils/product';

const ProductView = ({ className }) => {
   const [page, setPage] = useState(1);
   const [filterBy, setFilterBy] = useState('');
   const { products, isIdle, isLoading, isSuccess } = useProductItems(filterBy);

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

   if (isIdle || isLoading) return <FullPageSpinner />;

   if (isSuccess)
      return (
         <Row>
            <Col width='12' className={className}>
               <div className='products'>
                  <div className='products__titlebox'>
                     <Title className='products__title' modifiers='big'>
                        All Products
                     </Title>
                     <div className='products__select'>
                        <Select
                           name='category'
                           value={filterBy}
                           setValue={setFilterBy}
                           label='Select Category'
                        >
                           <Option>All</Option>
                           <Option>Electronics</Option>
                           <Option>Life</Option>
                        </Select>
                     </div>
                  </div>
                  <ListGroup wrap='true'>{renderProducts(products, page)}</ListGroup>
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
      &__titlebox {
         align-self: flex-start;
         display: flex;
         align-items: flex-start;
      }

      &__select {
         margin-left: 1rem;
      }
   }
`;

// <NativeSelect
//                            value={filterBy}
//                            onChange={(e) => setFilterBy(e.target.value)}
//                            name='category'
//                            inputProps={{ 'aria-label': 'age' }}
//                         >
//                            <option value=''>All</option>
//                            <option value='Electronics'>Electronics</option>
//                            <option value='Life'>Life</option>
//                         </NativeSelect>
