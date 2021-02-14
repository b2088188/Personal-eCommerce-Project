import React, { useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
   CenterWrapper,
   Button,
   ImageContainer,
   Image,
   Span,
   Title,
   ListGroup,
   Row,
   Col,
   Select
} from 'design/components';
import ReviewView from '../review/ReviewView';
import Options from 'components/Options';
import { FullPageSpinner } from 'components/Spinner';
import RatingStar from 'components/RatingStar';
import { media } from 'design/utils';
import { useProductInfo } from 'utils/product';
import useCart from 'context/cart/cartContext';
import { addToCartList, updateCartItem } from 'context/cart/CartProvider';

const ProductDetail = ({ className }) => {
   const { productId } = useParams();
   const { product, isIdle, isLoading, isSuccess } = useProductInfo(productId);
   const [{ cartList }, { dispatchCart }] = useCart();
   const [selectQty, setSelectQty] = useState(1);
   const [toCart, setToCart] = useState(false);
   const isInCart = cartList.find((el) => el.product === productId);

   function addCartClick(item, quantity) {
      return function () {
         if (!isInCart) {
            addToCartList(dispatchCart, item, +quantity);
         } else {
            updateCartItem(dispatchCart, item, +quantity);
         }
         setToCart(true);
      };
   }

   function renderSelect(count) {
      return (
         <ListGroup bbottom flexy='center'>
            <ListGroup.Item width='50'>Quantity</ListGroup.Item>
            <ListGroup.Item>
               <Select onChange={(e) => setSelectQty(e.target.value)}>
                  <Options options={count} />
               </Select>
            </ListGroup.Item>
         </ListGroup>
      );
   }

   if (toCart) return <Redirect to='/cart' />;

   if (isIdle || isLoading) return <FullPageSpinner />;

   if (isSuccess)
      return (
         <Row className={className}>
            <CenterWrapper width='70' className='product'>
               <Button as={Link} to='/' className='product__link'>
                  Go Back
               </Button>
               <Row direction={{ tabport: 'column' }}>
                  <Col width='4' spacing='2.5' className='product__group'>
                     <ImageContainer>
                        <Image
                           src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                           alt={product.name}
                        />
                     </ImageContainer>
                  </Col>
                  <Col width='3' spacing='2.5' className='product__group'>
                     <ListGroup bdbottom>
                        <Title as='h2' modifiers={['large', 'light']}>
                           {product.name}
                        </Title>
                     </ListGroup>
                     <ListGroup flexy='center' bdbottom>
                        <ListGroup.Item width='50'>
                           <RatingStar
                              average={product.ratingsQuantity < 1 ? 0 : product.ratingsAverage}
                           />
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Span>{product.ratingsQuantity} reviews</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom>
                        <ListGroup.Item width='50'>Price:</ListGroup.Item>
                        <ListGroup.Item>
                           <Span>${product.price}</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom>{product.description}</ListGroup>
                  </Col>
                  <Col width='3' spacing='2.5' className='product__group'>
                     <ListGroup bdbottom flexy='center'>
                        <ListGroup.Item width='50'>Price:</ListGroup.Item>
                        <ListGroup.Item>
                           <Span className='product__span'>${product.price}</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom flexy='center'>
                        <ListGroup.Item width='50'>Status:</ListGroup.Item>
                        <ListGroup.Item>
                           {product.countInStock > 1 ? 'In Stock' : 'Out of Stock'}
                        </ListGroup.Item>
                     </ListGroup>
                     {product.countInStock > 0 ? renderSelect(product.countInStock) : null}
                     <ListGroup bdtop>
                        <Button
                           onClick={addCartClick(product, selectQty)}
                           className='product__button'
                        >
                           Add To Cart
                        </Button>
                     </ListGroup>
                  </Col>
                  <ReviewView />
               </Row>
            </CenterWrapper>
         </Row>
      );
};

export default styled(ProductDetail)`
   .product {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &__group {
         ${media.tabport(`
            margin-bottom: 5rem;
            `)}
      }
      &__link {
         margin: 2rem 0;
      }
      &__span {
         margin-left: 1rem;
      }
      &__button {
         width: 100%;
      }
   }
`;
